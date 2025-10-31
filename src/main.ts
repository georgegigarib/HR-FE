import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'vue3-toastify/dist/index.css'
import { vueI18n } from './infrastructure/plugins/vue-i18n'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(vueI18n)

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right',
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light'
} as ToastContainerOptions)

app.mount('#app')
