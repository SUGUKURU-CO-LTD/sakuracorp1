const https = require('https');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('JSON parse error: ' + data.slice(0, 200)));
        }
      });
    }).on('error', reject);
  });
}

async function refreshToken(token) {
  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
  try {
    const data = await httpsGet(url);
    if (data.access_token) {
      return data.access_token;
    }
  } catch (e) {
    console.error('Token refresh failed:', e.message);
  }
  return token;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'Instagram token not configured', hint: 'Set INSTAGRAM_ACCESS_TOKEN in Vercel Environment Variables' });
  }

  try {
    const refreshedToken = await refreshToken(token);

    const limit = parseInt(req.query.limit) || 12;
    const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${limit}&access_token=${refreshedToken}`;

    const data = await httpsGet(apiUrl);

    if (data.error) {
      console.error('Instagram API error:', data.error);
      return res.status(400).json({ error: data.error.message });
    }

    const posts = (data.data || []).map(post => ({
      id: post.id,
      caption: post.caption || '',
      mediaType: post.media_type,
      mediaUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      permalink: post.permalink,
      timestamp: post.timestamp
    }));

    return res.status(200).json({ posts });
  } catch (error) {
    console.error('Instagram fetch error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch Instagram posts', detail: error.message });
  }
};
