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

const createProduct = async (categoryId, baseAttr, customAttr, images) => {
    const response = await axiosWithCredentials.post(`shop/products/`, {
        category: categoryId,
        name: baseAttr.name,
        slug: baseAttr.name,
        description: baseAttr.descriptions,
        price: baseAttr.price,
        attributes: customAttr
    })
    if (images) {
        await saveImages(response.data.id, images)
    }
    return response
}

const updateProduct = async (categoryId, baseAttr, customAttr, images) => {
    // const response = await axiosWithCredentials.put(`shop/products/`, {
    //     category: categoryId,
    //     name: baseAttr.name,
    //     slug: baseAttr.name,
    //     description: baseAttr.descriptions,
    //     price: baseAttr.price,
    //     attributes: customAttr
    // })
    if (images) {
        await saveImages(53, images)
    }
    // return response
}

const saveImages = async (productId, images) => {
    let formData = new FormData();
    let imageName = ""
    images.forEach((file, index) => {
        if (!file['old_image']) {
            if (index > 0) {
                imageName = "secondary-image-" + index
            } else {
                imageName = "main-image"
            }
            formData.append("files", file.file, imageName + "." + file.file.type.split('/')[1]);
        }
    });
    axiosWithCredentials.defaults.headers.common["Content-Type"] = "multipart/form-data"
    await axiosWithCredentials.put('shop/products/' + productId + '/upload_image/', formData
    )
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
    updateProduct,
}