import {axios, axiosWithCredentials} from "./utils";


const getReviews = async () => {
    return await axios.get(`shop/reviews/`)
}

const getReview = async (reviewId) => {
    return await axios.get(`shop/reviews/${reviewId}`)
}

const createReview = async (productId, text, parent) => {
    return await axiosWithCredentials.post(`shop/reviews/`, {
        product: productId,
        text: text,
        parent: parent
    })
}

export const reviewAPI = {
    getReviews,
    getReview,
    createReview,
}
