import { privateApiRequest } from '@/api/api.js'

export const OddService = {
    // Odds are nested under market in admin routes
    index(marketId, params = {}) {
        return privateApiRequest.get(`/admin/event/market/${marketId}/odd`, { params: params })
    },

    show(marketId, oddId) {
        return privateApiRequest.get(`/admin/event/market/${marketId}/odd/${oddId}`)
    },

    store(marketId, data) {
        return privateApiRequest.post(`/admin/event/market/${marketId}/odd`, data)
    },

    update(marketId, oddId, data) {
        return privateApiRequest.put(`/admin/event/market/${marketId}/odd/${oddId}`, data)
    },

    delete(marketId, oddId) {
        return privateApiRequest.delete(`/admin/event/market/${marketId}/odd/${oddId}`)
    },

    forceDelete(marketId, oddId) {
        return privateApiRequest.delete(`/admin/event/market/${marketId}/odd/force/${oddId}`)
    },

    restore(marketId, oddId) {
        return privateApiRequest.post(`/admin/event/market/${marketId}/odd/restore/${oddId}`)
    },
}
