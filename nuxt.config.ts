export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app:{
    keepalive:true,
    head: {
      titleTemplate: "(ADMIN) DIGITAL TWIN CLOUD"
    },
  },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/ui'], // proxy 제거함
  css: [
    'vuetify/styles',
    '@/assets/styles/main.scss',
    '@mdi/font/css/materialdesignicons.css'
  ],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8080', // ✅ 여기에 API 주소만 남김
    },
  },
})
