import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        "Content-Type": "application/json"
    }
})


const register = async (email, password) => {
    return await api.post(`auth/register/`, {email, password})
}
const login = async (email, password) => {
    const response = await api.post(`auth/login/`, {email, password})

    if (response.data.access) {
        console.log(response.data.access)
        localStorage.setItem("auth-token", response.data.access)
    }
    return response.data
}
const logout = () => {
    localStorage.removeItem('auth-token')
}


export const authAPI = {
    register,
    login,
    logout,
}
