import { defineStore } from 'pinia'
import { MarketService } from '@/services/MarketService.js'

export const useMarketStore = defineStore('market', {
    state: () => ({

    }),

    actions: {
        fetchMarkets(eventId, params = {}) {
            return new Promise((resolve, reject) => {
                MarketService.index(eventId, params)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        fetchMarket(eventId, marketId) {
            return new Promise((resolve, reject) => {
                MarketService.show(eventId, marketId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        createMarket(eventId, data) {
            return new Promise((resolve, reject) => {
                MarketService.store(eventId, data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        updateMarket(eventId, marketId, data) {
            return new Promise((resolve, reject) => {
                MarketService.update(eventId, marketId, data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        deleteMarket(eventId, marketId) {
            return new Promise((resolve, reject) => {
                MarketService.delete(eventId, marketId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        forceDeleteMarket(eventId, marketId) {
            return new Promise((resolve, reject) => {
                MarketService.forceDelete(eventId, marketId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        restoreMarket(eventId, marketId) {
            return new Promise((resolve, reject) => {
                MarketService.restore(eventId, marketId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },
    },
})
