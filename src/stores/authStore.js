import { defineStore } from 'pinia'
import { AuthService } from '@/services/AuthService'
import { useUserStore } from '@/stores/userStore.js'

const TOKEN_KEY = 'auth_token'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        persistToken(token) {
            try {
                localStorage.setItem(TOKEN_KEY, token)
            } catch (e) {
                console.warn('Не удалось сохранить токен:', e)
            }
        },

        clearPersistedToken() {
            try {
                localStorage.removeItem(TOKEN_KEY)
            } catch (e) { /* ignore */ }
        },

        hydrate() {
            try {
                const token = localStorage.getItem(TOKEN_KEY)
                if (token) this.token = token
            } catch (e) { /* ignore */ }
        },

        setToken(token) {
            this.token = token
            this.persistToken(token)
        },

        clearToken() {
            this.token = null
            this.clearPersistedToken()
        },

        async login({ email, password }) {
            try {
                const res = await AuthService.login({ email, password })
                const token = res?.data?.access_token ?? null

                if (!token) throw new Error('Некорректный ответ сервера: отсутствует токен')

                this.setToken(token)

                return res
            } catch (error) {
                this.clearToken()
                throw error
            }
        },

        async logout() {
            const userStore = useUserStore()
            try {
                await AuthService.logout()
            } catch (e) {
                console.warn('Ошибка при logout на сервере:', e)
            } finally {
                this.clearToken()
                userStore.clearUser()
            }
        },
    },
})
