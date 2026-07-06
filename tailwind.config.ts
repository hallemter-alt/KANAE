import type { Config } from "tailwindcss";

// 設計思想: 打ち放しコンクリート・石・木の素材感 — raw / 静謐 / 単色
// パレットは清水コンクリート灰・墨・石・古木をもとにした無彩色〜極低彩度トーン
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 墨・鉄・石のニュートラルグレー（旧 primary を置き換え / 既存クラス互換）
        primary: {
          50: '#f2f2f1',
          100: '#e6e6e4',
          200: '#d3d3d0',
          300: '#b3b3af',
          400: '#8c8c88',
          500: '#6e6e6a',  // 鉄灰
          600: '#575754',
          700: '#454542',
          800: '#333331',
          900: '#222221',
        },
        // 去金 — コンクリート・石・古木の無彩〜極低彩度（旧 gold を置き換え / 既存クラス互換）
        gold: {
          50: '#f0efed',
          100: '#e3e1dd',   // 清水コンクリート明
          200: '#d0cdc8',   // コンクリート
          300: '#b6b2ac',   // 石灰
          400: '#9c968e',   // 砂岩
          500: '#847d74',   // 古木・石の陰（アクセント代替）
          600: '#6d675f',
          700: '#57524c',   // 古木
          800: '#433f3b',
          900: '#33302d',   // 炭
        },
        // 墨（背景・文字用の最深色）
        ink: {
          DEFAULT: '#1c1c1b',
          soft: '#262625',
          mute: '#343432',
        },
        // 清水コンクリート（背景）— 旧 washi を冷たい打ち放し灰へ
        washi: {
          DEFAULT: '#dcdbd8',   // 打ち放しコンクリートの灰
          warm: '#d3d2ce',
          linen: '#c6c4bf',
        },
        // 石の陰（アクセントの無彩灰）
        pine: {
          DEFAULT: '#7c7a76',
          deep: '#575551',
          pale: '#a8a6a1',
        },
        // 霧（ニュートラルな灰）
        mist: {
          DEFAULT: '#8a8987',
          light: '#c2c1be',
          dark: '#4c4b49',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'var(--font-noto-serif)', 'Georgia', 'serif'],
        noto: ['var(--font-noto-sans)', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      transitionTimingFunction: {
        'quiet': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
