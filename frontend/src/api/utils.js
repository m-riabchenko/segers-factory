import axiosAPI from "axios";

const URL = '/api/'

export const HOST = 'http://' + window.location.hostname

const getTokenFromLocalStorage = () => {
    let authToken = localStorage.getItem("auth-token")
    if (!authToken) {
        return null
    } else {
        return `Bearer ` + authToken
    }
}

export const axiosWithCredentials = axiosAPI.create({
    withCredentials: true,
    baseURL: URL,
    headers: {
        Authorization: getTokenFromLocalStorage()
    }
})

export const axios = axiosAPI.create({
    baseURL: URL,
})


export const verify_token = async (queryParameters) => {
    let authToken = localStorage.getItem("auth-token");
    return await axios.post(`auth/jwt/verify/`, {"token":authToken })
}


export const setTokenInAxiosRequest = () => {
    let authToken = localStorage.getItem("auth-token");
    if (authToken === null) {
        axiosWithCredentials.defaults.headers.Authorization = null;
    } else {
        axiosWithCredentials.defaults.headers.Authorization = `Bearer ${authToken}`;
    }
}
