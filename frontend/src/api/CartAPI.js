const axios = require("axios");


const api = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem("auth-token")
    }
})


const getUserCart = async () => {
    const response = await api.get(`shop/cart/`)
    return response.data
}

const addProductToCart = async (productId, count = 1) => {
    const response = await api.post(`shop/cart/`, {product: productId, count})
    return response.data
}

const updateCartItem = async (cartItemId, count) => {
    const response = await api.patch(`shop/cart/${cartItemId}/`, {count})
    return response.data
}

const removeCartItem = async (cartItemId) => {
    const response = await api.delete(`shop/cart/${cartItemId}/`)
    return response.data
}


export const cartAPI = {
    getUserCart,
    addProductToCart,
    updateCartItem,
    removeCartItem,
}
