import { privateApiRequest } from '@/api/api.js'

export const EventService = {
    // Получить список команд с пагинацией
    index(params = {}) {
        return privateApiRequest.get('/admin/event', {  params: params })
    },

    // Получить конкретный команду по id
    show(id) {
        return privateApiRequest.get(`/admin/event/${id}`)
    },

    // Создать новую команду
    store(data) {
        return privateApiRequest.post('/admin/event', data)
    },

    // Обновить команду
    update(id, data) {
        return privateApiRequest.put(`/admin/event/${id}`, data)
    },

    // Мягкое удаление вида спорта
    delete(id) {
        return privateApiRequest.delete(`/admin/event/${id}`)
    },

    // Жесткое удаление
    forceDelete(id) {
        return privateApiRequest.delete(`/admin/event/force/${id}`)
    },

    // Восстановление удалённого вида спорта
    restore(id) {
        return privateApiRequest.post(`/admin/event/restore/${id}`)
    },
}
