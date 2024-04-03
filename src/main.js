import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'

import App from '@/App.vue'
import router from '@/router'

import AuthService from '@/service/auth'
import RoomService from '@/service/room'
import ConfigService from '@/service/config.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCookies)

const authService = new AuthService(VueCookies)
const configService = new ConfigService()
const roomService = new RoomService(authService)

app.provide('service.auth', authService)
app.provide('service.config', configService)
app.provide('service.room', roomService)

app.mount('#app')
