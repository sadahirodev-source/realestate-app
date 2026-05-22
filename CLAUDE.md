# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Operations

**コードを変更するたびに、必ずコミットして GitHub にプッシュすること。**

```bash
git add <変更ファイル>
git commit -m "変更内容を説明するメッセージ"
git push origin main
```

## Commands

```bash
npm run dev      # 開発サーバー起動（http://localhost:5173）
npm run build    # 本番ビルド（dist/ に出力）
npm run preview  # ビルド結果をローカルでプレビュー
npm run lint     # ESLint 実行
```

## Architecture

React + Vite + Supabase 構成の不動産管理 Web アプリ。

### 認証フロー

- Supabase Auth（メール＋パスワード）を使用
- `AuthContext` がセッション状態をグローバル管理し、`onAuthStateChange` でリアルタイム同期
- `ProtectedRoute` が未認証ユーザーを `/login` にリダイレクト
- ルート `/` は `/login` に自動リダイレクト

### ディレクトリ構成

```
src/
├── lib/supabase.js          # Supabase クライアント（環境変数から初期化）
├── contexts/AuthContext.jsx # 認証状態・signIn・signUp・signOut を提供
├── components/
│   └── ProtectedRoute.jsx   # 認証ガード（未ログイン → /login）
└── pages/
    ├── LoginPage.jsx        # ログインフォーム
    ├── RegisterPage.jsx     # 会員登録フォーム
    └── PropertiesPage.jsx   # 物件一覧（ログアウトボタン付き）
```

### 環境変数

`.env` に以下を設定（`.gitignore` で除外済み）:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Vite の慣例により、クライアントから参照できる変数は `VITE_` プレフィックスが必要。
