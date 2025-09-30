.PHONY: help install dev build preview clean lint format type-check test test-coverage quality ci

# デフォルトターゲット
help: ## ヘルプを表示
	@echo "利用可能なコマンド:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36mmake %-15s\033[0m %s\n", $$1, $$2}'

install: ## 依存関係をインストール
	npm install

dev: ## 開発サーバーを起動
	npm run dev

build: ## プロダクションビルド
	npm run build

preview: build ## ビルド結果をプレビュー
	npm run preview

clean: ## ビルド成果物を削除
	rm -rf dist node_modules/.vite coverage
	@echo "クリーンアップ完了"

lint: ## リントを実行
	npm run lint

format: ## コードをフォーマット
	npm run format

type-check: ## TypeScript型チェック
	npm run type-check

test: ## テストを実行
	npm run test -- --run

test-coverage: ## カバレッジ付きでテストを実行
	npm run test:coverage

quality: type-check lint test ## すべての品質チェックを実行
	@echo "すべての品質チェックが完了しました"

ci: quality build ## CI環境での全チェック
	@echo "CI チェックが完了しました"

# セットアップ（初回のみ）
setup: install ## 初回セットアップ
	@echo "セットアップが完了しました"
	@echo "開発サーバーを起動するには 'make dev' を実行してください"