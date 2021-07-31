import {axios} from "./utils";


const createOrder = async (data, delivery, cartItems) => {
    let order = {}
    if (!delivery) {
        order = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phoneNumber,
            order_message: data.messageOrder,
            cart_items: cartItems,
        }
    } else {
        order = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phoneNumber,
            order_message: data.messageOrder,
            cart_items: cartItems,
            delivery: {
                street: data.streetNumber,
                house_number: data.houseNumber,
                city: data.city,
                region: data.region,
                zip_code: data.zipCode,
                delivery_message: data.messageDelivery
            }
        }
    }
    return await axios.post(`shop/orders/`, order)
}


export const orderAPI = {
    createOrder,
}
