import {axiosWithCredentials} from "./utils";


const getUserCart = async () => {
    const response = await axiosWithCredentials.get(`shop/cart-me`)
    return response.data
}

const addProductToCart = async (productId, count = 1) => {
    const response = await axiosWithCredentials.post(`shop/cart/`, {product: productId, count})
    return response.data
}

const updateCartItem = async (cartItemId, count) => {
    const response = await axiosWithCredentials.patch(`shop/cart/${cartItemId}/`, {count})
    return response.data
}

const removeCartItem = async (cartItemId) => {
    const response = await axiosWithCredentials.delete(`shop/cart/${cartItemId}/`)
    return response.data
}


export const cartAPI = {
    getUserCart,
    addProductToCart,
    updateCartItem,
    removeCartItem,
}
