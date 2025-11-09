import { privateApiRequest } from '@/api/api.js'

export const EventParticipantService = {
    index(eventId, params = {}) {
        return privateApiRequest.get(`/admin/event/${eventId}/participant`, { params: params })
    },

    show(eventId, participantId) {
        return privateApiRequest.get(`/admin/event/${eventId}/participant/${participantId}`)
    },

    store(eventId, data) {
        return privateApiRequest.post(`/admin/event/${eventId}/participant`, data)
    },

    update(eventId, participantId, data) {
        return privateApiRequest.put(`/admin/event/${eventId}/participant/${participantId}`, data)
    },

    delete(eventId, participantId) {
        return privateApiRequest.delete(`/admin/event/${eventId}/participant/${participantId}`)
    },

    forceDelete(eventId, participantId) {
        return privateApiRequest.delete(`/admin/event/${eventId}/participant/force/${participantId}`)
    },

    restore(eventId, participantId) {
        return privateApiRequest.post(`/admin/event/${eventId}/participant/restore/${participantId}`)
    },
}
