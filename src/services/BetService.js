import { publicApiRequest, privateApiRequest } from '@/api/api.js'

export const BetService = {
    // Admin: список ставок
    index(params = {}) {
        return privateApiRequest.get('/admin/bet', { params: params })
    },

    show(id) {
        return privateApiRequest.get(`/admin/bet/${id}`)
    },

    store(data) {
        return privateApiRequest.post('/admin/bet', data)
    },

    update(id, data) {
        return privateApiRequest.put(`/admin/bet/${id}`, data)
    },

    delete(id) {
        return privateApiRequest.delete(`/admin/bet/${id}`)
    },

    forceDelete(id) {
        return privateApiRequest.delete(`/admin/bet/force/${id}`)
    },

    restore(id) {
        return privateApiRequest.post(`/admin/bet/restore/${id}`)
    },

    // User-facing endpoints (authenticated)
    userIndex(params = {}) {
        return privateApiRequest.get('/bet', { params: params })
    },

    userShow(id) {
        return privateApiRequest.get(`/bet/${id}`)
    },

    userStore(data) {
        return privateApiRequest.post('/bet', data)
    },
}
