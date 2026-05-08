import type { Preview } from "@storybook/react";
import React from "react";
import "../src/app/globals.css"; // Tailwind CSS 入口

// フォント読み込み
import "@fontsource/noto-serif-jp/400.css";
import "@fontsource/noto-serif-jp/600.css";
import "@fontsource/noto-serif-jp/700.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/500.css";
import "@fontsource/noto-sans-jp/700.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/500.css";

const preview: Preview = {
  parameters: {
    // 背景色: 和紙白（実際の使用環境を再現）
    backgrounds: {
      default: "和紙白",
      values: [
        { name: "和紙白", value: "#F5F3EF" },
        { name: "混凝土灰", value: "#E8E4DF" },
        { name: "炭墨黑", value: "#2C2C2C" },
        { name: "純白（建材用）", value: "#FFFFFF" },
      ],
    },

    // ビューポート（レスポンシブ確認用）
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "900px" },
        },
        wide: { name: "Wide", styles: { width: "1920px", height: "1080px" } },
      },
      defaultViewport: "desktop",
    },

    // アクション設定
    actions: { argTypesRegex: "^on[A-Z].*" },

    // コントロール設定
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    // ドキュメント設定
    docs: {
      toc: true, // 目次自動生成
    },

    // Figma 連携（各ストーリーで上書き可能）
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/KANAE-Design-System",
    },
  },

  // グローバルデコレーター
  decorators: [
    (Story) => (
      <div
        style={{
          fontFamily: '"Noto Sans JP", "Noto Serif JP", sans-serif',
          backgroundColor: "#F5F3EF",
          minHeight: "100vh",
          padding: "32px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
