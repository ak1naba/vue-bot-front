import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/style/main.css'
import {useAuthStore} from "@/stores/authStore.js";
import {useUserStore} from "@/stores/userStore.js";
import {useSportStore} from "@/stores/sportStore.js";

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Import stores
app.config.globalProperties.$auth = useAuthStore()
app.config.globalProperties.$users = useUserStore()
app.config.globalProperties.$sport = useSportStore()


app.mount('#app')
