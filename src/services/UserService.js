import { publicApiRequest, privateApiRequest } from '@/api/api.js'

export const UserService = {
    getMe() {
        return privateApiRequest.get('/user/me')
    },
}