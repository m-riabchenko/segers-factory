import {axiosWithCredentials} from "./utils";


const createOrder = async (data) => {
    const order = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        address: data.address,
        postal_code: data.zipCode,
        city: data.address
    }
    return await axiosWithCredentials.post(`shop/orders/`, order)
}


export const orderAPI = {
    createOrder,
}
