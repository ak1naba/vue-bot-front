import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const config = {
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
}

const token = localStorage.getItem('auth_token')
if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
}


const publicApiRequest = axios.create(config)
const privateApiRequest = axios.create(config)

privateApiRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized — removing token and reloading...')
        }
        return Promise.reject(error)
    }
)

export { publicApiRequest, privateApiRequest }