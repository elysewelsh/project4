import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export function token () {
    const passkey = localStorage.getItem('token')
    return passkey
}

export const userClient = axios.create({
    baseURL: `${BASE_URL}/api/users`,
    headers: {
        Authorization: `Bearer ${token()}`
    }
})

export const projectClient = axios.create({
    baseURL: `${BASE_URL}/api/projects`
})

projectClient.interceptors.request.use((req) => {
    if (token()) {
        req.headers.Authorization = `Bearer ${token()}`
    }
    return req
})

export const taskClient = axios.create({
    baseURL: `${BASE_URL}/api/`
})

taskClient.interceptors.request.use((req) => {
    if (token()) {
        req.headers.Authorization = `Bearer ${token()}`
    }
    return req
})