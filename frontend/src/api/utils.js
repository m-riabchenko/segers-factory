import axiosAPI from "axios";

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
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        Authorization: getTokenFromLocalStorage()
    }
})

export const axios = axiosAPI.create({
    baseURL: 'http://127.0.0.1:8000/',
})

export const setTokenInAxiosRequest = () => {
    let authToken = localStorage.getItem("auth-token");
    if (authToken === null) {
        axiosWithCredentials.defaults.headers.Authorization = null;
    } else {
        axiosWithCredentials.defaults.headers.Authorization = `Bearer ${authToken}`;
    }
}
