import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
    ssr: true,
    theme: {
      defaultTheme: 'dark', // 기본 테마
      themes: {
        dark: {
          dark: true,
          colors: {
            background: '#293740',
            surface: '#212121',
            primary: '#90caf9',
            secondary: '#f48fb1',
            error: '#ef5350',
            success: '#66bb6a',
            info: '#29b6f6',
            warning: '#ffa726',
          },
        },
        light: {
          dark: false,
          colors: {
            background: '#eaf4ff',
            surface: '#ffffff',
            primary: '#1976d2',
            secondary: '#e91e63',
            error: '#f44336',
            success: '#4caf50',
            info: '#2196f3',
            warning: '#ff9800',
          },
        },
      },
    },
  })
  nuxtApp.vueApp.use(vuetify)
})
