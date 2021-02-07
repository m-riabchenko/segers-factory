import {createContext, useEffect, useState} from "react";
import {cartAPI} from "../api/CartAPI";

const CartContext = createContext(null)


const CartProvider = (props) => {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await cartAPI.getUserCart();
            setCart(response.data)
            setLoading(false)
        })()
    }, [])

    const addToCart = async (productId) => {
        setLoading(true)
        await cartAPI.addProductToCart(productId)
        const response = await cartAPI.getUserCart();
        setCart(response.data)
        setLoading(false)
    }

    const updateCartItem = async (id, count) => {
        setLoading(true)
        await cartAPI.updateCartItem(id, count)
        const response = await cartAPI.getUserCart();
        setCart(response.data)
        setLoading(false)
    }
    const removeCartItem = async (id) => {
        setLoading(true)
        await cartAPI.removeCartItem(id)
        const response = await cartAPI.getUserCart();
        setCart(response.data)
        setLoading(false)
    }

    return (
        <CartContext.Provider
            value={{
                cart: cart,
                loading: loading,
                updateCartItem: updateCartItem,
                removeCartItem: removeCartItem,
                addToCart: addToCart
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export {CartProvider, CartContext};