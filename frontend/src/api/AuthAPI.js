import {axiosWithCredentials, setTokenInAxiosRequest} from "./utils";


const register = async (email, password) => {
    return await axiosWithCredentials.post(`auth/register/`, {email, password})
}
const login = async (email, password) => {
    const response = await axiosWithCredentials.post(`auth/login/`, {email, password})

    if (response.data.access) {
        console.log(response.data.access)
        localStorage.setItem("auth-token", response.data.access)
        setTokenInAxiosRequest()
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
