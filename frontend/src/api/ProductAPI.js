import axios from "axios";
import {getToken} from "./AuthAPI";

// const api = axios.create({
//     withCredentials: true,
//     baseURL: 'http://127.0.0.1:8000/',
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": 'Bearer ' + getToken()
//     }
// })


const getProduct = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/shop/products/`)
    return response.data
}

export const productAPI = {
    getProduct
}