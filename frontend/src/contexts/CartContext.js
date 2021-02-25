import {createContext, useEffect, useReducer, useState} from "react";
import {cartAPI} from "../api/CartAPI";
import {CartReducer} from "./CartReducer";

const CartContext = createContext(null)


const CartProvider = (props) => {
    const [state, dispatch] = useReducer(CartReducer, {items: [], total: 0});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await cartAPI.getUserCart();
            dispatch({
                type: "SET_CART",
                payload: {items: response.data.items, total: response.data.total}
            })
            setLoading(false)
        })()
    }, [])

    const setUserCart = async () => {
        const response = await cartAPI.getUserCart();
        dispatch({
            type: "SET_CART",
            payload: {items: response.data.items, total: response.data.total}
        })
        setLoading(false)
    }

    const addToCart = async (productId, count = 1) => {
        setLoading(true)
        const response = await cartAPI.addProductToCart(productId, count)
        dispatch({
            type: "ADD_ITEM",
            payload: {cartItem: response.data}
        })
        setLoading(false)
    }

    const updateCartItem = async (id, count) => {
        setLoading(true)
        const response = await cartAPI.updateCartItem(id, count)
        dispatch({
            type: "UPDATE_COUNT",
            payload: {cartItem: response.data}
        })
        setLoading(false)
    }
    const removeCartItem = async (id) => {
        setLoading(true)
        const response = await cartAPI.removeCartItem(id)
        dispatch({
            type: "REMOVE_ITEM",
            payload: {id: response.data.id}
        })
        setLoading(false)
    }

    const clearCart = () => {
        dispatch({type: "CLEAR"})
    }

    const totalCart = () => {
        let totalVal = 0;
        for (let i = 0; i < state.items.length; i++) {
            totalVal += parseFloat(state.items[i].total)
        }
        return totalVal
    };

    return (
        <CartContext.Provider
            value={{
                cart: state,
                loading: loading,
                setUserCart: setUserCart,
                updateCartItem: updateCartItem,
                removeCartItem: removeCartItem,
                addToCart: addToCart,
                clearCart: clearCart,
                totalCart: totalCart,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};


export {CartProvider, CartContext};