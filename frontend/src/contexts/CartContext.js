import {createContext, useEffect, useState} from "react";
import {cartAPI} from "../api/CartAPI";

const CartContext = createContext(null)


const CartProvider = (props) => {
    const [cart, setCart] = useState({items: [], total: 0})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await cartAPI.getUserCart();
            setCart(response.data)
            setLoading(false)
        })()
    }, [])

    const setUserCart = async () => {
        const response = await cartAPI.getUserCart();
        setCart(response.data)
        setLoading(false)
    }

    const addToCart = async (productId, count = 1) => {
        setLoading(true)
        await cartAPI.addProductToCart(productId, count)
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

    const clearCart = () => {
        setCart(null)
    }

    return (
        <CartContext.Provider
            value={{
                cart: cart,
                loading: loading,
                setUserCart: setUserCart,
                updateCartItem: updateCartItem,
                removeCartItem: removeCartItem,
                addToCart: addToCart,
                clearCart: clearCart,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};


export {CartProvider, CartContext};