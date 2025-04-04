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
    theme: {
      defaultTheme: 'adminDark',
      themes: {
        adminDark: {
          dark: true,
          colors: {
            primary: '#2196F3',
            background: '#1e1e1e',
            surface: '#2A2A2A',
            onPrimary: '#fff',
          }
        }
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
