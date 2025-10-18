import { privateApiRequest } from '@/api/api.js'

export const SportService = {
    // Получить список видов спорта с пагинацией
    index(params = {}) {
        return privateApiRequest.get('/admin/sport', {  params: params })
    },

    // Получить конкретный вид спорта по id
    show(id) {
        return privateApiRequest.get(`/admin/sport/${id}`)
    },

    // Создать новый вид спорта
    store(data) {
        return privateApiRequest.post('/admin/sport', data)
    },

    // Обновить вид спорта
    update(id, data) {
        return privateApiRequest.put(`/admin/sport/${id}`, data)
    },

    // Мягкое удаление вида спорта
    delete(id) {
        return privateApiRequest.delete(`/admin/sport/${id}`)
    },

    // Жесткое удаление
    forceDelete(id) {
        return privateApiRequest.delete(`/admin/sport/force/${id}`)
    },

    // Восстановление удалённого вида спорта
    restore(id) {
        return privateApiRequest.post(`/admin/sport/restore/${id}`)
    },
}
