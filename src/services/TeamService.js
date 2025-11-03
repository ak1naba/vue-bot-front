import { privateApiRequest } from '@/api/api.js'

export const TeamService = {
    // Получить список команд с пагинацией
    index(params = {}) {
        return privateApiRequest.get('/admin/team', {  params: params })
    },

    // Получить конкретный команду по id
    show(id) {
        return privateApiRequest.get(`/admin/team/${id}`)
    },

    // Создать новую команду
    store(data) {
        return privateApiRequest.post('/admin/team', data)
    },

    // Обновить команду
    update(id, data) {
        return privateApiRequest.put(`/admin/team/${id}`, data)
    },

    // Мягкое удаление вида спорта
    delete(id) {
        return privateApiRequest.delete(`/admin/team/${id}`)
    },

    // Жесткое удаление
    forceDelete(id) {
        return privateApiRequest.delete(`/admin/team/force/${id}`)
    },

    // Восстановление удалённого вида спорта
    restore(id) {
        return privateApiRequest.post(`/admin/team/restore/${id}`)
    },
}
