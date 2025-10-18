import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/style/main.css'
import {useAuthStore} from "@/stores/authStore.js";
import {useUserStore} from "@/stores/userStore.js";

const app = createApp(App)

app.use(createPinia())
app.use(router)


const authStore = useAuthStore()
const userStore = useUserStore()

app.config.globalProperties.$auth = authStore
app.config.globalProperties.$users = userStore


app.mount('#app')
