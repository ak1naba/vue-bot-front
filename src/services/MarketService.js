import { privateApiRequest } from '@/api/api.js'

export const MarketService = {
    // Markets are nested under event in admin routes
    index(eventId, params = {}) {
        return privateApiRequest.get(`/admin/event/${eventId}/market`, { params: params })
    },

    show(eventId, marketId) {
        return privateApiRequest.get(`/admin/event/${eventId}/market/${marketId}`)
    },

    store(eventId, data) {
        return privateApiRequest.post(`/admin/event/${eventId}/market`, data)
    },

    update(eventId, marketId, data) {
        return privateApiRequest.put(`/admin/event/${eventId}/market/${marketId}`, data)
    },

    delete(eventId, marketId) {
        return privateApiRequest.delete(`/admin/event/${eventId}/market/${marketId}`)
    },

    forceDelete(eventId, marketId) {
        return privateApiRequest.delete(`/admin/event/${eventId}/market/force/${marketId}`)
    },

    restore(eventId, marketId) {
        return privateApiRequest.post(`/admin/event/${eventId}/market/restore/${marketId}`)
    },
}
