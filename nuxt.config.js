export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "NEXGAME STUDIO - Game Studio Hàng Đầu",
    htmlAttrs: {
      lang: "vi",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "NEXGAME STUDIO - Khám phá thế giới game đỉnh cao với đồ họa tuyệt đẹp và gameplay hấp dẫn",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://cdn.tailwindcss.com" },
    ],
    script: [
      { src: "https://cdn.tailwindcss.com" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js",
      },
    ],
  },
 axios: {
    baseURL: process.env.API_BASE_URL ,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  ssr: true,
  target: "static",
};
