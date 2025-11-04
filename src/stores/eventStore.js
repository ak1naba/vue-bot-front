import { defineStore } from 'pinia'
import { EventService } from '@/services/EventService.js'

export const useEventStore = defineStore('event', {
    state: () => ({

    }),

    actions: {
        fetchEvents(params = {}) {
            return new Promise((resolve, reject) => {
                EventService.index(params)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        fetchEvent(id) {
            return new Promise((resolve, reject) => {
                EventService.show(id)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        createEvent(data) {
            return new Promise((resolve, reject) => {
                EventService.store(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        updateEvent(id, data) {
            return new Promise((resolve, reject) => {
                EventService.update(id, data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        deleteEvent(id) {
            return new Promise((resolve, reject) => {
                EventService.delete(id)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        forceDeleteEvent(id) {
            return new Promise((resolve, reject) => {
                EventService.forceDelete(id)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        restoreEvent(id) {
            return new Promise((resolve, reject) => {
                EventService.restore(id)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },
    },
})
