# TODOアプリ

React + TypeScript で構築された、モダンで実用的なTODOアプリケーション

## 特徴

- 🚀 **モダンな技術スタック**: React 18 + TypeScript + Vite
- 🎨 **美しいUI**: Tailwind CSSによるレスポンシブデザイン
- ⚡ **高速**: Viteによる高速ビルド・開発サーバー
- 💾 **データ永続化**: LocalStorageによる自動保存
- 🔍 **強力な検索**: タイトル、説明、タグによる全文検索
- 🏷️ **タグ機能**: 複数タグによる柔軟な分類
- ⏰ **期限管理**: 期限設定と期限切れアラート
- 🎯 **優先度管理**: 3段階の優先度設定と色分け表示

## 技術スタック

### フロントエンド
- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - 高速ビルドツール
- **Tailwind CSS** - ユーティリティファーストCSSフレームワーク
- **Zustand** - 軽量な状態管理
- **date-fns** - 日付操作

### データ永続化
- **LocalStorage** - ブラウザローカルストレージによるデータ保存

### 開発ツール
- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマッター
- **Vitest** - テストフレームワーク
- **TypeScript** - 静的型チェック

## 実装済み機能

### 📝 基本機能（Phase 1）
- ✅ タスクの追加
- ✅ タスク一覧表示
- ✅ タスクの完了/未完了切り替え
- ✅ タスクの削除
- ✅ データの永続化（LocalStorage）

### ✨ ユーザビリティ向上（Phase 2）
- ✅ タスクの編集（インライン編集）
- ✅ ステータスフィルタリング（全て/未完了/完了）
- ✅ ソート機能（作成日時/更新日時/優先度/タイトル）
- ✅ アニメーション効果
- ✅ 入力バリデーション（文字数制限、エラーメッセージ）
- ✅ 文字数カウンター

### 🎯 拡張機能（Phase 3）
- ✅ 優先度設定（低・中・高）
- ✅ 優先度による色分け表示
- ✅ 期限日時の設定
- ✅ 期限切れアラート（視覚的警告）
- ✅ タグ機能（複数タグ対応）
- ✅ 全文検索（タイトル、説明、タグ）
- ✅ リアルタイム検索

### 📋 計画中の機能（Phase 4）
- 📋 ダークモード
- 📋 ドラッグ&ドロップによる並び替え
- 📋 キーボードショートカット
- 📋 統計情報の可視化
- 📋 データのエクスポート/インポート

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

### Makefileを使った簡単セットアップ

```bash
# 初回セットアップ
make setup

# 開発サーバー起動
make dev

# その他のコマンドを確認
make help
```

### ビルド

```bash
# プロダクションビルド
npm run build

# または
make build

# ビルド結果のプレビュー
npm run preview

# または
make preview
```

## 使い方

### 基本操作

#### 1. タスクの追加
1. 上部の入力フォームにタスク名を入力
2. 優先度を選択（低・中・高）
3. 「追加」ボタンをクリックまたはEnterキーを押す

#### 2. タスクの編集
1. タスクの「編集」ボタンをクリック
2. 以下の項目を編集可能：
   - タスク名
   - 説明
   - 優先度（低・中・高）
   - 期限日
   - タグ（カンマ区切りで複数入力可能）
3. 「保存」ボタンをクリック

#### 3. タスクの完了
- タスクのチェックボックスをクリックして完了/未完了を切り替え
- 完了したタスクは打ち消し線が表示されます

#### 4. タスクの削除
- タスクの「削除」ボタンをクリック

### 高度な機能

#### フィルタリング
- **全て**: すべてのタスクを表示
- **未完了**: 未完了のタスクのみ表示
- **完了**: 完了済みのタスクのみ表示

#### ソート
- **作成日時**: 新しい順にソート（デフォルト）
- **更新日時**: 最近更新されたタスクを上位表示
- **優先度**: 高→中→低の順にソート
- **タイトル**: 50音順にソート

#### 検索
- 検索ボックスに文字を入力
- タイトル、説明、タグを対象に全文検索
- リアルタイムで結果が更新されます

#### 優先度管理
- **高（赤）**: 最優先で対応が必要なタスク
- **中（黄）**: 通常の優先度（デフォルト）
- **低（緑）**: 時間があるときに対応

#### 期限管理
- 期限を設定すると、タスクに期限日が表示されます
- 期限切れのタスク（未完了で期限が過去）は赤色で警告表示
- 期限が設定されているタスクは青色で表示

#### タグ機能
- タスク編集画面でタグを追加
- カンマ区切りで複数タグを入力（例: `仕事, 重要`）
- タグは `#タグ名` の形式で表示されます
- タグによる検索も可能

### データの永続化
- すべてのデータは自動的にブラウザのLocalStorageに保存されます
- ブラウザを閉じても、データは保持されます
- ブラウザのキャッシュをクリアするとデータが削除されるため注意してください

## 開発

### プロジェクト構造

```
todo/
├── src/
│   ├── components/         # UIコンポーネント
│   │   ├── FilterBar.tsx   # フィルター・ソート・検索バー
│   │   ├── TaskInput.tsx   # タスク入力フォーム
│   │   ├── TaskItem.tsx    # タスクアイテム
│   │   └── TaskList.tsx    # タスクリスト
│   ├── hooks/              # カスタムフック（将来の拡張用）
│   ├── stores/             # 状態管理（Zustand）
│   │   └── taskStore.ts    # タスク管理ストア
│   ├── types/              # TypeScript型定義
│   │   └── index.ts        # Task型など
│   ├── utils/              # ユーティリティ関数
│   │   └── storage.ts      # LocalStorage操作
│   ├── App.tsx             # ルートコンポーネント
│   ├── main.tsx            # エントリーポイント
│   └── index.css           # グローバルスタイル
├── tests/                  # テストコード
├── public/                 # 静的ファイル
├── Makefile                # 開発用Makefileコマンド
└── README.md               # このファイル
```

### 開発コマンド

#### npmコマンド

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

#### Makefileコマンド

```bash
# ヘルプを表示
make help

# 初回セットアップ
make setup

# 開発サーバー起動
make dev

# ビルド
make build

# ビルド結果のプレビュー
make preview

# すべての品質チェック（型チェック + リント）
make quality

# クリーンアップ
make clean
```

### データモデル

```typescript
interface Task {
  id: string                          // UUID
  title: string                       // タスク名（必須）
  description?: string                // 説明（任意）
  status: 'pending' | 'completed'     // ステータス
  priority: 'low' | 'medium' | 'high' // 優先度
  dueDate?: Date                      // 期限日（任意）
  tags: string[]                      // タグ配列
  createdAt: Date                     // 作成日時
  updatedAt: Date                     // 更新日時
}
```

### 状態管理

このアプリケーションでは[Zustand](https://github.com/pmndrs/zustand)を使用した軽量な状態管理を採用しています。

主な操作:
- `addTask()`: タスクの追加
- `updateTask()`: タスクの更新
- `deleteTask()`: タスクの削除
- `toggleTask()`: タスクの完了/未完了切り替え
- `loadTasks()`: LocalStorageからのデータ読み込み

### コーディング規約

- **ESLint**: コード品質を保証
- **Prettier**: コードフォーマットを統一
- **TypeScript**: 厳格な型チェック
- **コミットメッセージ**: [Conventional Commits](https://www.conventionalcommits.org/) 形式

## トラブルシューティング

### 開発サーバーが起動しない
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### データが消えた
- ブラウザのキャッシュクリアによりLocalStorageのデータが削除された可能性があります
- 定期的にブラウザの開発者ツールからLocalStorageのバックアップを取ることを推奨します

### ビルドエラーが発生する
```bash
# 型チェックを実行
npm run type-check

# リントエラーを確認
npm run lint

# クリーンビルド
make clean
make build
```

### ポート5173が使用中
```bash
# Viteは自動的に別のポートを使用します
# または、vite.config.tsでポートを変更できます
```

## コントリビューション

### ブランチ命名規則
- `feat/`: 新機能
- `fix/`: バグ修正
- `docs/`: ドキュメント更新
- `refactor/`: リファクタリング
- `test/`: テスト追加

### プルリクエストの手順
1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feat/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチにプッシュ (`git push origin feat/amazing-feature`)
5. Pull Requestを作成

### 開発フロー
- mainブランチへの直接コミットは禁止
- すべての変更はPull Requestを経由
- レビュー後にマージ

## ライセンス

MIT

## 開発履歴

### Phase 1: MVP（基本機能）
- タスクのCRUD操作
- データ永続化
- 基本的なUI

### Phase 2: ユーザビリティ向上
- タスク編集機能
- フィルタリング・ソート
- アニメーション
- バリデーション強化

### Phase 3: 拡張機能
- 優先度システム
- 期限管理
- タグ機能
- 全文検索

### Phase 4: 高度な機能（計画中）
- ダークモード
- ドラッグ&ドロップ
- キーボードショートカット
- 統計情報

各フェーズの詳細は [GitHub Issues](https://github.com/nyasuto/todo/issues) を参照してください。

## リンク

- [GitHub Repository](https://github.com/nyasuto/todo)
- [Issues](https://github.com/nyasuto/todo/issues)
- [Pull Requests](https://github.com/nyasuto/todo/pulls)

---

**作成者**: Claude Code
**最終更新**: 2025年10月（Phase 3完了時）