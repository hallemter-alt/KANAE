import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // KANAE 7業務線コンポーネント
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "chromatic",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y", // アクセシビリティチェック
    "@storybook/addon-designs", // Figma連携
    "@storybook/addon-viewport", // レスポンシブ
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  // 静的ビルド設定（Chromatic デプロイ用）
  staticDirs: ["../public"],

  // ビルド最適化
  core: {
    disableTelemetry: true,
  },
};

export default config;
