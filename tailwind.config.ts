import type { Config } from "tailwindcss";

// 設計思想: 建築と自然の融合 — 静けさ・光・素材・歳月
// パレットは石・和紙・松煙・墨をもとにした低彩度トーン
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 墨・石のグレー（旧 primary を置き換え / 既存クラス互換）
        primary: {
          50: '#f6f7f4',   // 霜白
          100: '#eceee9',
          200: '#d9dcd4',
          300: '#b9bfb6',
          400: '#8f978e',
          500: '#6f776f',  // 松煙がかった灰
          600: '#5e6462',  // 鉄灰
          700: '#4a5049',
          800: '#373b37',
          900: '#252825',
        },
        // 土・砂・古木の暖灰（旧 gold を置き換え / 既存クラス互換）
        gold: {
          50: '#faf8f4',
          100: '#f1ece3',
          200: '#e4ded4',  // 亜麻
          300: '#cfc4b6',
          400: '#b7a99f',  // 灰梅
          500: '#94877d',  // 砂岩
          600: '#7a6f66',
          700: '#68635f',  // 古木
          800: '#534d49',
          900: '#434140',  // 炭
        },
        // 墨（背景・文字用の最深色）
        ink: {
          DEFAULT: '#21201f',
          soft: '#2b2a28',
          mute: '#3a3835',
        },
        // 和紙（背景）
        washi: {
          DEFAULT: '#f6f7f4',
          warm: '#f1ece3',
          linen: '#e4ded4',
        },
        // 松煙（アクセントの緑）
        pine: {
          DEFAULT: '#7a857c',
          deep: '#5e6462',
          pale: '#aab3aa',
        },
        // 霧（青みの灰）
        mist: {
          DEFAULT: '#808a92',
          light: '#bdc7ce',
          dark: '#4a5156',
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
