const https = require('https');

const API_BASE = 'https://graph.facebook.com/v21.0';

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
  if (!process.env.FB_APP_ID || !process.env.FB_APP_SECRET) {
    return token;
  }
  const url = `${API_BASE}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_APP_SECRET}&fb_exchange_token=${token}`;
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

async function getInstagramBusinessAccountId(token) {
  // 環境変数で直接指定されていればスキップ
  if (process.env.IG_BUSINESS_ACCOUNT_ID) {
    return process.env.IG_BUSINESS_ACCOUNT_ID;
  }

  // FB_PAGE_ID が設定されていれば、そこから直接取得
  if (process.env.FB_PAGE_ID) {
    const pageUrl = `${API_BASE}/${process.env.FB_PAGE_ID}?fields=instagram_business_account&access_token=${token}`;
    const pageData = await httpsGet(pageUrl);
    if (pageData.error) {
      throw new Error(`FB_PAGE_ID(${process.env.FB_PAGE_ID})からの取得エラー: ${pageData.error.message}`);
    }
    if (pageData.instagram_business_account && pageData.instagram_business_account.id) {
      return pageData.instagram_business_account.id;
    }
    throw new Error(`FB_PAGE_ID(${process.env.FB_PAGE_ID})にInstagramビジネスアカウントが紐づいていません。`);
  }

  // 自動検出: /me/accounts
  const pagesUrl = `${API_BASE}/me/accounts?fields=id,name,instagram_business_account&access_token=${token}`;
  const pagesData = await httpsGet(pagesUrl);

  if (pagesData.error) {
    throw new Error(`Facebook API error (code ${pagesData.error.code}): ${pagesData.error.message}`);
  }

  if (!pagesData.data || pagesData.data.length === 0) {
    throw new Error(
      'Facebookページが見つかりません。解決方法: ' +
      '(1) Graph API Explorer で pages_show_list 権限を付与してトークンを再発行するか、' +
      '(2) Vercel環境変数に IG_BUSINESS_ACCOUNT_ID を直接設定してください。'
    );
  }

  for (const page of pagesData.data) {
    if (page.instagram_business_account && page.instagram_business_account.id) {
      return page.instagram_business_account.id;
    }
  }

  throw new Error(
    `Facebookページ(${pagesData.data.map(p => p.name || p.id).join(', ')})にInstagramビジネスアカウントが紐づいていません。`
  );
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate=60');

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: 'INSTAGRAM_ACCESS_TOKEN が未設定です。'
    });
  }

  try {
    const activeToken = await refreshToken(token);
    const igAccountId = await getInstagramBusinessAccountId(activeToken);

    const limit = parseInt(req.query.limit) || 12;
    const mediaUrl = `${API_BASE}/${igAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${limit}&access_token=${activeToken}`;
    const mediaData = await httpsGet(mediaUrl);

    if (mediaData.error) {
      console.error('Instagram media API error:', mediaData.error);
      return res.status(400).json({ error: mediaData.error.message });
    }

    const posts = (mediaData.data || []).map(post => {
      const isVideo = post.media_type === 'VIDEO' || post.media_type === 'REELS';
      const mediaUrl = isVideo
        ? (post.thumbnail_url || post.media_url)
        : post.media_url;
      return {
        id: post.id,
        caption: post.caption || '',
        mediaType: isVideo ? 'VIDEO' : post.media_type,
        mediaUrl: mediaUrl || null,
        permalink: post.permalink,
        timestamp: post.timestamp
      };
    });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error('Instagram fetch error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
