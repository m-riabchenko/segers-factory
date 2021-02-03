import {axios} from "./utils";

const getCategories = async () => {
    const response = await axios.get(`shop/categories/`)
    return response.data
}

const getCategoryFilters = async (category_id) => {
    return await axios.get(`shop/categories/${category_id}/filters`)
}

export const categoryAPI = {
    getCategories,
    getCategoryFilters,
}