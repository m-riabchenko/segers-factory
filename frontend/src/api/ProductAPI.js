import {axios} from "./utils";

const getProducts = async () => {
    const response = await axios.get(`shop/products/`)
    return response.data
}

const getProductDetail = async (productId) => {
    return await axios.get(`shop/products/${productId}`)
}

const getProductByFilters = async (queryParameters) => {
    return await axios.get(`shop/products/?${queryParameters}`)
}

export const productAPI = {
    getProducts,
    getProductDetail,
    getProductByFilters,
}