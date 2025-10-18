import { publicApiRequest, privateApiRequest } from '@/api/api.js'

export const AuthService = {
    login(credentials) {
        return publicApiRequest.post('/login', credentials)
    },
}