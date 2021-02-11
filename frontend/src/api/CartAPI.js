import {axiosWithCredentials} from "./utils";


const getUserCart = async () => {
    return await axiosWithCredentials.get(`shop/cart-me`)
}

const addProductToCart = async (productId, count = 1) => {
    return await axiosWithCredentials.post(`shop/cart/`, {product_id: productId, count})
}

const updateCartItem = async (cartItemId, count) => {
    return await axiosWithCredentials.patch(`shop/cart/${cartItemId}/`, {count})
}

const removeCartItem = async (cartItemId) => {
    return await axiosWithCredentials.delete(`shop/cart/${cartItemId}/`)
}


export const cartAPI = {
    getUserCart,
    addProductToCart,
    updateCartItem,
    removeCartItem,
}
