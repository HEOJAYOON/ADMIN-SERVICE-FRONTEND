// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/ui'],
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css'  // 이거는 위에 패키지 설치했을 때만 유효
  ],
  build: {
    transpile: ['vuetify'],
  },
})