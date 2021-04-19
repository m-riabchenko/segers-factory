import {axios} from "./utils";

const sendMessage = async (data) => {
    return await axios.post(`contact/contact-us/`,
        {
            "full_name": data["fullName"],
            "phone": data["phone"],
            "message": data["message"]
        })
}

const subscribe = async (data) => {
    console.log({"email": data["email"]})
    return await axios.post(`contact/newsletters/`, {"email": data["email"]})
}

export const contactAPI = {
    sendMessage,
    subscribe,
}