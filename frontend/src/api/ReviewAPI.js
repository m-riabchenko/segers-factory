import {axios, axiosWithCredentials} from "./utils";


const getReviews = async () => {
    return await axios.get(`shop/reviews/`)
}

const getReview = async (reviewId) => {
    return await axios.get(`shop/reviews/${reviewId}`)
}

const createReview = async (data) => {
    console.log(data)
    return await axiosWithCredentials.post(`shop/reviews/`, data)
}

export const reviewAPI = {
    getReviews,
    getReview,
    createReview,
}
