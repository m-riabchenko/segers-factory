import {axios, axiosWithCredentials} from "./utils";

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

const createProduct = async (categoryId, baseAttr, customAttr) => {
    return await axiosWithCredentials.post(`shop/products/`, {
        category: categoryId,
        name: baseAttr.name,
        slug: baseAttr.name,
        description: baseAttr.descriptions,
        price: baseAttr.price,
        attributes: customAttr
    })
}

const getReviewProduct = async (productId) => {
    return await axios.get(`shop/products/${productId}/reviews/`)
}


export const productAPI = {
    getProducts,
    getProductDetail,
    getProductByFilters,
    createProduct,
    getReviewProduct,
}