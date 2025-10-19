import { defineStore } from 'pinia'
import { SportService } from '@/services/SportService.js'

export const useSportStore = defineStore('sport', {
    state: () => ({
        sports: [],
        currentSport: null,
    }),

    actions: {
        fetchSports(params = {}) {
            return new Promise((resolve, reject) => {
                SportService.index(params)
                    .then(res => {
                        this.sports = res.data
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        fetchSport(id) {
            return new Promise((resolve, reject) => {
                SportService.show(id)
                    .then(res => {
                        this.currentSport = res.data
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        createSport(data) {
            return new Promise((resolve, reject) => {
                SportService.store(data)
                    .then(res => {
                        this.sports.push(res.data)
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        updateSport(id, data) {
            return new Promise((resolve, reject) => {
                SportService.update(id, data)
                    .then(res => {
                        const index = this.sports.findIndex(s => s.id === id)
                        if (index !== -1) this.sports[index] = res.data
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        deleteSport(id) {
            return new Promise((resolve, reject) => {
                SportService.delete(id)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        forceDeleteSport(id) {
            return new Promise((resolve, reject) => {
                SportService.forceDelete(id)
                    .then(res => {
                        this.sports = this.sports.filter(s => s.id !== id)
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        restoreSport(id) {
            return new Promise((resolve, reject) => {
                SportService.restore(id)
                    .then(res => {
                        // Можно добавить в список снова, если backend возвращает объект
                        this.sports.push(res.data)
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },
    },
})
