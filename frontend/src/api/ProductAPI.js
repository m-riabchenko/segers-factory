import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('auth-token')
    }
})
console.log(localStorage.getItem('auth-token'))


const getProduct = async () => {
    const response = await api.get(`shop/products/`)
    return response.data
}

export const productAPI = {
    getProduct
}