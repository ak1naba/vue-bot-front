import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

const apiUrl = import.meta.env.VITE_API_URL

const config = {
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
}

const publicApiRequest = axios.create(config)
const privateApiRequest = axios.create(config)

privateApiRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

privateApiRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized — removing token and clearing user data...')

            const authStore = useAuthStore()
            const userStore = useUserStore()

            authStore.clearToken()
            userStore.clearUser()

            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export { publicApiRequest, privateApiRequest }