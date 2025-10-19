import { defineStore } from 'pinia'
import { UserService } from '@/services/UserService.js'

const STORAGE_KEY = 'user' // версия ключа, чтобы можно было мигрировать

function safeParse(json) {
    try {
        return JSON.parse(json)
    } catch (e) {
        return null
    }
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.user,
        isAdmin: (state) => !!state.user && state.user.role === 'admin',
        userName: (state) => state.user?.name ?? null,
        userEmail: (state) => state.user?.email ?? null,
    },

    actions: {
        persistUser(user) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            } catch (e) {
                // безопасно игнорируем ошибки (например, режим инкогнито)
                // можно логировать в dev
                // console.warn('Could not persist user:', e)
            }
        },

        clearPersistedUser() {
            try {
                localStorage.removeItem(STORAGE_KEY)
            } catch (e) { /* ignore */ }
        },

        hydrate() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY)
                const parsed = safeParse(raw)
                if (parsed && typeof parsed === 'object') {
                    this.user = parsed
                }
            } catch (e) {
                // ignore
            }
        },

        setUser(user) {
            this.user = user
            this.persistUser(user)
        },

        clearUser() {
            this.user = null
            this.clearPersistedUser()
        },

        async getMe() {
            try {
                const res = await UserService.getMe()
                const user = res?.data?.user ?? null
                this.user = user
                if (user) this.persistUser(user)
                return res
            } catch (error) {
                this.clearUser()
                throw error
            }
        },
    },
})
