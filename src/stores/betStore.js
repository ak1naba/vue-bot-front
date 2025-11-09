import { defineStore } from 'pinia'
import { BetService } from '@/services/BetService.js'

export const useBetStore = defineStore('bet', {
    state: () => ({

    }),

    actions: {
        // Admin
        fetchBets(params = {}) {
            return new Promise((resolve, reject) => {
                BetService.index(params)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        fetchBet(id) {
            return new Promise((resolve, reject) => {
                BetService.show(id)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        createBet(data) {
            return new Promise((resolve, reject) => {
                BetService.store(data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        updateBet(id, data) {
            return new Promise((resolve, reject) => {
                BetService.update(id, data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        deleteBet(id) {
            return new Promise((resolve, reject) => {
                BetService.delete(id)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        forceDeleteBet(id) {
            return new Promise((resolve, reject) => {
                BetService.forceDelete(id)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        restoreBet(id) {
            return new Promise((resolve, reject) => {
                BetService.restore(id)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        // User-facing
        fetchUserBets(params = {}) {
            return new Promise((resolve, reject) => {
                BetService.userIndex(params)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        fetchUserBet(id) {
            return new Promise((resolve, reject) => {
                BetService.userShow(id)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        createUserBet(data) {
            return new Promise((resolve, reject) => {
                BetService.userStore(data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },
    },
})
