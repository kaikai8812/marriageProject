# デプロイ

現在の変更をコミットし、GitHub Pagesにデプロイする。

## 手順

1. `git status` で変更内容を確認する
2. `git diff` で差分を確認し、変更内容を要約する
3. ユーザーに変更内容の要約を伝え、コミットしてよいか確認する
4. 確認が取れたら:
   - 変更ファイルを `git add` する
   - 適切な日本語コミットメッセージでコミットする
   - `main` ブランチにpushする
5. GitHub Actionsのデプロイ状況を確認する:
   ```bash
   gh run list --repo kaikai8812/marriageProject --limit 1
   ```
6. 公開URL https://kaikai8812.github.io/marriageProject/ を案内する

## コミットメッセージのルール
- 日本語で簡潔に記述する
- 例: 「ヒーローセクションのデザインを更新」「ギャラリーセクションを追加」
