module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // タイプ必須・大文字禁止
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新機能
        "fix", // バグ修正
        "docs", // ドキュメント
        "style", // コードスタイル（フォーマット等）
        "refactor", // リファクタリング
        "perf", // パフォーマンス改善
        "test", // テスト追加・修正
        "build", // ビルドシステム
        "ci", // CI/CD設定
        "chore", // 雑務（依存関係更新等）
        "revert", // リバート
        "design", // UI/UXデザイン変更
        "content", // コンテンツ更新（物件情報等）
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],

    // スコープ（オプション）
    "scope-enum": [
      1,
      "always",
      [
        "rental", // 賃貸
        "sales", // 売買
        "investment", // 投資
        "management", // 賃貸管理
        "inn", // 民宿
        "bm", // 建物維持
        "materials", // 建材
        "layout", // レイアウト共通
        "map", // 地図
        "pdf", // PDF文書
        "seo", // SEO
        "i18n", // 多言語
        "ai", // AI推薦
        "vr", // VR内見
        "iot", // IoT
        "workflow", // N8N工作流
        "db", // データベース
        "design", // デザインシステム
        "storybook", // Storybook
        "ci", // CI/CD
        "deps", // 依存関係
      ],
    ],
    "scope-case": [2, "always", "lower-case"],
    "scope-empty": [0], // スコープは任意

    // 説明文
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-min-length": [2, "always", 10],
    "subject-max-length": [2, "always", 100],

    // 本文
    "body-max-line-length": [2, "always", 100],
    "body-leading-blank": [1, "always"],

    // フッター
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],

    // ヘッダー全体
    "header-max-length": [2, "always", 100],
  },

  // 日本語メッセージ対応
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)(?:\(([^)]+)\))?:\s(.+)$/,
      headerCorrespondence: ["type", "scope", "subject"],
    },
  },
};
