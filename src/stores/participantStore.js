import { defineStore } from 'pinia'
import { EventParticipantService } from '@/services/EventParticipantService.js'

export const useParticipantStore = defineStore('participant', {
    state: () => ({

    }),

    actions: {
        fetchParticipants(eventId, params = {}) {
            return new Promise((resolve, reject) => {
                EventParticipantService.index(eventId, params)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        fetchParticipant(eventId, participantId) {
            return new Promise((resolve, reject) => {
                EventParticipantService.show(eventId, participantId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        createParticipant(eventId, data) {
            return new Promise((resolve, reject) => {
                EventParticipantService.store(eventId, data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        updateParticipant(eventId, participantId, data) {
            return new Promise((resolve, reject) => {
                EventParticipantService.update(eventId, participantId, data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        deleteParticipant(eventId, participantId) {
            return new Promise((resolve, reject) => {
                EventParticipantService.delete(eventId, participantId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        forceDeleteParticipant(eventId, participantId) {
            return new Promise((resolve, reject) => {
                EventParticipantService.forceDelete(eventId, participantId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },

        restoreParticipant(eventId, participantId) {
            return new Promise((resolve, reject) => {
                EventParticipantService.restore(eventId, participantId)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },
    },
})
