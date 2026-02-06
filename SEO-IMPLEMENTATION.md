# SEO対策実装ガイド

株式会社SAKURA東海コーポレーションのウェブサイトに実装したSEO対策の詳細です。

## 📋 実装内容

### 1. サイトマップ（sitemap.xml）

**ファイル:** `sitemap.xml`

全ページのURLを検索エンジンに伝えるためのサイトマップを作成しました。

#### 設定内容：
- **lastmod**: 最終更新日（2026-02-05）
- **changefreq**: 更新頻度
  - トップページ・お知らせ: weekly（週次）
  - その他のページ: monthly/yearly
- **priority**: ページの重要度（0.0〜1.0）
  - トップページ: 1.0（最重要）
  - 事業内容・学園: 0.9
  - 会社概要・採用: 0.7〜0.8
  - その他: 0.5〜0.6

#### 含まれるページ：
- トップページ（index.html）
- 事業内容（service.html）
- SAKURA東海国際学園（school.html）
- 会社概要（about.html）
- お知らせ（news.html）
- ご挨拶（greeting.html）
- 採用情報（recruit.html）
- お問い合わせ（contact.html）

---

### 2. robots.txt

**ファイル:** `robots.txt`

検索エンジンのクローラーに対する指示を記述しています。

#### 設定内容：
```txt
User-agent: *
Allow: /
```
全てのクローラーに対して、サイト全体のクロールを許可しています。

#### 除外設定：
- `/thanks.html` - 送信完了ページ（検索結果に表示不要）
- `/.vscode/` - 開発用ディレクトリ
- `/*.pdf$` - PDFファイル

#### サイトマップの場所：
```txt
Sitemap: https://www.sakura-tokai.co.jp/sitemap.xml
```

---

### 3. メタタグ最適化

全HTMLファイルに以下のメタタグを追加しました。

#### 基本メタタグ

各ページに適切な説明文を設定：

```html
<meta name="description" content="...">
<title>ページタイトル | 株式会社SAKURA東海コーポレーション</title>
```

#### OGP（Open Graph Protocol）タグ

SNSでシェアされた際の表示を最適化：

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.sakura-tokai.co.jp/xxx.html">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://www.sakura-tokai.co.jp/images/sakuralogo3.png">
<meta property="og:site_name" content="株式会社SAKURA東海コーポレーション">
<meta property="og:locale" content="ja_JP">
```

#### Twitter Cardタグ

Twitter/X でのシェアを最適化：

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://www.sakura-tokai.co.jp/images/sakuralogo3.png">
```

#### Canonical URL

重複コンテンツを防ぐための正規URL指定：

```html
<link rel="canonical" href="https://www.sakura-tokai.co.jp/xxx.html">
```

#### Favicon

ブラウザのタブに表示されるアイコン：

```html
<link rel="icon" type="image/png" href="images/sakuralogo3.png">
```

---

## 🚀 サーバーへのアップロード手順

### 1. ファイルのアップロード

以下のファイルをサーバーのルートディレクトリにアップロードしてください：

- `sitemap.xml`
- `robots.txt`

### 2. URLの確認

アップロード後、以下のURLでアクセスできることを確認：

- https://www.sakura-tokai.co.jp/sitemap.xml
- https://www.sakura-tokai.co.jp/robots.txt

---

## 🔍 Google Search Consoleへの登録

### 1. サイトマップの送信

1. [Google Search Console](https://search.google.com/search-console) にログイン
2. 左メニューから「サイトマップ」を選択
3. 新しいサイトマップを追加：`https://www.sakura-tokai.co.jp/sitemap.xml`
4. 「送信」をクリック

### 2. インデックス登録のリクエスト

各ページのURL検査ツールを使用して、インデックス登録をリクエストできます。

---

## 📊 効果測定

### Google Search Console で確認できる項目：

- **検索パフォーマンス**: クリック数、表示回数、CTR、掲載順位
- **カバレッジ**: インデックス登録状況
- **サイトマップ**: サイトマップの処理状況
- **モバイルユーザビリティ**: モバイル対応状況

### Google Analytics で確認できる項目：

- オーガニック検索からの流入数
- 検索キーワード（一部）
- ユーザーの行動データ

---

## 🔧 メンテナンス

### サイトマップの更新タイミング：

- 新しいページを追加した時
- ページの内容を大幅に更新した時
- 3〜6ヶ月に1回程度、lastmodの日付を更新

### メタタグの見直し：

- 検索結果のクリック率が低い場合、タイトルやディスクリプションを改善
- 新しいサービスや強調したいポイントが出てきた場合

---

## 💡 追加の最適化提案

### 今後検討できるSEO対策：

1. **構造化データ（JSON-LD）の追加**
   - 組織情報（Organization）
   - パンくずリスト（BreadcrumbList）
   - よくある質問（FAQPage）

2. **ページ速度の最適化**
   - 画像の圧縮・最適化
   - CSSの最小化
   - キャッシュ設定

3. **コンテンツの充実**
   - ブログ記事の追加
   - よくある質問（FAQ）ページ
   - 外国人材支援に関する情報記事

4. **内部リンクの強化**
   - 関連ページへのリンク追加
   - パンくずリストの実装

5. **外部サイトからの被リンク獲得**
   - 業界団体への登録
   - プレスリリース配信
   - SNSでの情報発信

---

## 📝 注意事項

### ドメインについて

このドキュメントでは `https://www.sakura-tokai.co.jp/` を例として使用していますが、実際のドメインが異なる場合は、以下のファイルを修正してください：

- `sitemap.xml` の各`<loc>`タグ内のURL
- 全HTMLファイルのOGPタグ（`og:url`、`og:image`）
- 全HTMLファイルのTwitter Cardタグ（`twitter:image`）
- 全HTMLファイルのCanonical URL

### OGP画像について

現在は会社ロゴ（`sakuralogo3.png`）を使用していますが、より視覚的に訴求力のある専用のOGP画像（1200×630px推奨）を作成することをお勧めします。

---

## 📞 サポート

SEO対策についてご不明な点がありましたら、お気軽にご相談ください。

**作成日:** 2026年2月5日
