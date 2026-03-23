# ロコイベ（Local Events App）

地域住民が気軽にイベントを作成・参加できる  
三島市周辺向けの地域コミュニティイベント管理Webアプリです。

若者・家族層・高齢者をつなぐ「参加ハードルを極限まで下げた地域接点アプリ」を目指しています。

---

## ■ サービス概要

ロコイベは、地域イベントの情報発信と参加を簡単に行えるプラットフォームです。

### 🎯 コンセプト

- 発見型 × 即参加型
- ワンタップ参加
- 作成者権限の明確化
- 地域交流促進

---

## ■ ターゲット

- 近所で気軽に参加できるイベントを探したい若者
- 子どもと参加できるイベントを探す家族層
- 地域交流や運動機会を求める高齢者

---

## ■ 実装機能（MVP）

### 👤 認証機能
- ユーザー新規登録（名前 + パスワード）
- ログイン（JWT認証）
- ログアウト
- 名前ユニーク制約

---

### 📅 イベント機能（CRUD）

- イベント作成
- イベント一覧表示
- イベント詳細表示
- イベント編集（作成者のみ）
- イベント削除（作成者のみ）
- 定員制御
- 同日参加可否フラグ

---

### 🙋 参加機能

- ワンタップ参加
- 参加キャンセル
- 定員超過時参加不可
- 自分の参加イベント確認（マイページ）

---

### 🔐 権限制御

- 作成者のみ編集・削除可能
- JWTトークン認証
- API認可制御

---

### 📱 UI設計

- PC：ヘッダーナビ
- モバイル：フッターナビ
- レスポンシブ対応
- 柔らかく親しみやすい配色

---

## ■ 使用技術

### フロントエンド

- React
- TypeScript
- React Router
- Axios
- JWT Decode
- Vite

---

### バックエンド

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT（jsonwebtoken）
- bcrypt

---

### 開発環境

- Docker（PostgreSQL）
- ts-node-dev

---

## ■ ディレクトリ構成
```
local-events-app/
├── backend/
│ ├── prisma/
│ ├── src/
│ └── ...
└── frontend/
├── src/
└── ...
```

---

## ■ セットアップ手順

### ① リポジトリをクローン
```
git clone <repository_url>
cd local-events-app
```

---

### ② Backend起動
```
cd backend
npm install
```
.env を作成
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/local_events_app"
JWT_SECRET="super_secret_key"
```
Prismaマイグレーション
```
npx prisma migrate dev
```
サーバー起動
```
npm run dev
```

---

### ③ Frontend起動
```
cd frontend
npm install
npm run dev
```

---

## ■ 動作確認方法

### 1. ユーザー登録
- サインアップ画面から登録

### 2. ログイン
- JWTトークン取得確認

### 3. イベント作成
- 「作成」から新規作成

### 4. イベント参加
- 一覧 or 詳細から参加

### 5. 編集・削除確認
- 作成者のみ操作可能

---

## ■ 今後の拡張予定

- 世代別表示
- 参加者一覧表示
- コメント機能
- 画像アップロード
- 家族参加ボーナス
- バッジ機能
- PWA対応
- デプロイ（Vercel / Railway / Render）

---

## ■ 今回のMVPの目的

- 地域交流促進の仕組み構築
- 参加ハードルの極限削減
- 若者を起点とした高齢者巻き込み設計
- 将来的な継続性機能への拡張基盤構築