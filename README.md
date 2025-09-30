# TODOアプリ

React + TypeScript で構築された、モダンで実用的なTODOアプリケーション

## 技術スタック

### フロントエンド
- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - 高速ビルドツール
- **Tailwind CSS** - ユーティリティファーストCSSフレームワーク
- **Zustand** - 軽量な状態管理
- **React Hook Form** - フォーム管理
- **date-fns** - 日付操作

### データ永続化
- **LocalStorage** - ブラウザローカルストレージによるデータ保存

### 開発ツール
- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマッター
- **Vitest** - テストフレームワーク
- **TypeScript** - 静的型チェック

## 機能

### 実装済み機能（Phase 1 - MVP）
- ✅ タスクの追加
- ✅ タスク一覧表示
- ✅ タスクの完了/未完了切り替え
- ✅ タスクの削除
- ✅ データの永続化（LocalStorage）

### 計画中の機能
- 📋 **Phase 2**: タスク編集、フィルタリング、ソート、UI/UX改善
- 📋 **Phase 3**: 優先度設定、期限管理、タグ機能、検索
- 📋 **Phase 4**: ダークモード、ドラッグ&ドロップ、キーボードショートカット

詳細は [GitHub Issues](https://github.com/nyasuto/todo/issues) を参照してください。

## セットアップ

### 必要な環境
- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/nyasuto/todo.git
cd todo

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

### ビルド

```bash
# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 使い方

1. **タスクの追加**: 上部の入力フォームにタスク名を入力してEnterキーまたは追加ボタンをクリック
2. **タスクの完了**: チェックボックスをクリックして完了/未完了を切り替え
3. **タスクの削除**: 削除ボタンをクリック
4. **データの永続化**: ブラウザを閉じても自動的にデータが保存されます

## 開発

### プロジェクト構造

```
todo/
├── src/
│   ├── components/     # UIコンポーネント
│   ├── hooks/          # カスタムフック
│   ├── stores/         # 状態管理（Zustand）
│   ├── types/          # TypeScript型定義
│   ├── utils/          # ユーティリティ関数
│   ├── App.tsx         # ルートコンポーネント
│   └── main.tsx        # エントリーポイント
├── tests/              # テストコード
└── public/             # 静的ファイル
```

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 型チェック
npm run type-check

# リント
npm run lint

# フォーマット
npm run format

# テスト実行
npm run test

# ビルド
npm run build
```

## コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feat/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチにプッシュ (`git push origin feat/amazing-feature`)
5. Pull Requestを作成

## ライセンス

MIT

## 開発の進め方

このプロジェクトは段階的に開発を進めています：

1. **Phase 1 (MVP)** - 基本機能の実装
2. **Phase 2** - ユーザビリティ向上
3. **Phase 3** - 拡張機能追加
4. **Phase 4** - 高度な機能とUX改善

各フェーズの詳細は [GitHub Issues](https://github.com/nyasuto/todo/issues) を参照してください。


