import {axios} from "./utils";

const getProducts = async () => {
    const response = await axios.get(`shop/products/`)
    return response.data
}

const getProductDetail = async (productId) => {
    return await axios.get(`shop/products/${productId}`)
}



export const productAPI = {
    getProducts,
    getProductDetail,
}