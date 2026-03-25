# Marriage Project - ウェディング招待LP

## 公開URL
https://kaikai8812.github.io/marriageProject/

## セットアップ

```bash
git clone git@github.com:kaikai8812/marriageProject.git
cd marriageProject
```

## ローカルで確認する

```bash
npx serve src
```

ブラウザで http://localhost:3000 を開く。

## 開発の流れ

1. `src/` 配下のファイルを編集
2. ローカルで確認
3. `main` ブランチにpush
4. 約15〜30秒で公開URLに自動反映

## ファイル構成

```
src/
├── index.html    ... メインページ
├── style.css     ... スタイルシート
├── script.js     ... JavaScript
└── images/       ... 画像ファイル
```

## Claude Code スキル

このプロジェクトにはClaude Code用のスキルが用意されています。

| コマンド | 説明 |
|---------|------|
| `/add-section` | LPに新しいセクションを追加 |
| `/preview` | ローカルプレビューを起動 |
| `/deploy` | 変更をデプロイ（commit & push） |
| `/responsive` | レスポンシブ表示の確認・修正 |
| `/optimize-image` | 画像の最適化 |
