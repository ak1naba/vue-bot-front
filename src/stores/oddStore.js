import { defineStore } from 'pinia'
import { OddService } from '@/services/OddService.js'

export const useOddStore = defineStore('odd', {
    state: () => ({

    }),

    actions: {
        fetchOdds(marketId, params = {}) {
            return new Promise((resolve, reject) => {
                OddService.index(marketId, params)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        fetchOdd(marketId, oddId) {
            return new Promise((resolve, reject) => {
                OddService.show(marketId, oddId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        createOdd(marketId, data) {
            return new Promise((resolve, reject) => {
                OddService.store(marketId, data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        updateOdd(marketId, oddId, data) {
            return new Promise((resolve, reject) => {
                OddService.update(marketId, oddId, data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        deleteOdd(marketId, oddId) {
            return new Promise((resolve, reject) => {
                OddService.delete(marketId, oddId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        forceDeleteOdd(marketId, oddId) {
            return new Promise((resolve, reject) => {
                OddService.forceDelete(marketId, oddId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        restoreOdd(marketId, oddId) {
            return new Promise((resolve, reject) => {
                OddService.restore(marketId, oddId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },
    },
})
