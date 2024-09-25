import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#9070FF",
        yellow: "#FBFF14",
      },
      backgroundImage: {
        leaderBoardGradient:
          "linear-gradient(90deg, rgba(203, 178, 255, .12) 27.6%, rgba(203, 178, 255, .08) 67.25%, rgba(203, 178, 255, .12) 91.15%)",
        joinUs:
          "radial-gradient(110.74% 101.73% at 50% -1.73%, hsla(0, 0%, 100%, .3) 0, hsla(0, 0%, 100%, .08) 60.14%, hsla(0, 0%, 100%, .02) 100%)",
        chatGrad: 'linear-gradient(263deg, #8562FD 38.58%, #302068 84.68%)',
        sendButton: 'linear-gradient(180deg, #FBFF14 37.86%, #DBB800 99.36%)',
        gradTopLeft: 'linear-gradient(36deg, #0F0C24 -31.33%, #000 91.08%)',
        gradTopRight: 'linear-gradient(250deg, #0F0C24 33.86%, #000 108.24%)',
        gradBottomLeft: 'linear-gradient(43deg, #0F0C24 21.81%, #000 148.87%)',
        gradBottomRight: 'linear-gradient(238deg, #0F0C24 -7.97%, #000 77.26%)',
        boxBorder: 'linear-gradient(240deg, #392880 8.81%, #2F283C 37.43%, #27243A 82.79%)',
        circle: 'linear-gradient(135deg, #000 -24.36%, rgba(95, 73, 173, 0.60) 92.56%)',
        score: 'linear-gradient(180deg, #8562FD 0%, #302068 124.14%)'
      },
      boxShadow: {
        btn: '0px -12px 44px 0px rgba(255, 251, 221, 0.15), 0px 12px 44px 0px rgba(251, 255, 20, 0.15)'
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        bebas: ["var(--font-bebas_neue)"],
      },
      screens: {
        mobile: "560px",
      },
    },
  },
  plugins: [],
};
export default config;
