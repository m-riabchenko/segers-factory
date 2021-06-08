import {axios, axiosWithCredentials} from "./utils";

const getCategories = async () => {
    const response = await axios.get(`shop/categories/`)
    return response.data
}

const getCategory = async (categoryId) => {
    return await axios.get(`shop/categories/${categoryId}`)
}

const getCategoryFilters = async (categoryId) => {
    return await axios.get(`shop/categories/${categoryId}/unique_values/`)
}

const createCategory = async (name, schemaAttributes, parent) => {
    return await axiosWithCredentials.post(`shop/categories/`,
        {name: name, schema_attributes: schemaAttributes, parent: parent})
}

export const categoryAPI = {
    getCategories,
    getCategory,
    getCategoryFilters,
    createCategory,
}