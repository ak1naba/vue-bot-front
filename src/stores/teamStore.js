import { defineStore } from 'pinia'
import { TeamService } from '@/services/TeamService.js'

export const useTeamStore = defineStore('team', {
    state: () => ({

    }),

    actions: {
        fetchTeams(params = {}) {
            return new Promise((resolve, reject) => {
                TeamService.index(params)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        fetchTeam(id) {
            return new Promise((resolve, reject) => {
                TeamService.show(id)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        createTeam(data) {
            return new Promise((resolve, reject) => {
                TeamService.store(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        updateTeam(id, data) {
            return new Promise((resolve, reject) => {
                TeamService.update(id, data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        deleteTeam(id) {
            return new Promise((resolve, reject) => {
                TeamService.delete(id)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        forceDeleteTeam(id) {
            return new Promise((resolve, reject) => {
                TeamService.forceDelete(id)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },

        restoreTeam(id) {
            return new Promise((resolve, reject) => {
                TeamService.restore(id)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },
    },
})
