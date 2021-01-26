import {CartItem} from "./CartItem";
import React, {useEffect, useState} from "react";
import {cartAPI} from "../../../api/CartAPI";
import {RingLoader} from "react-spinners";

export const ShoppingCart = () => {
    let [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await cartAPI.getUserCart();
            setCart(response)
            setLoading(false)
        })()
    }, [])

    const onUpdateCartItem = async (id, count) => {
        setLoading(true)
        await cartAPI.updateCartItem(id, count)
        const response = await cartAPI.getUserCart();
        setCart(response)
        setLoading(false)
    }

    const onClickRemoveCartItem = async (id) => {
        setLoading(true)
        await cartAPI.removeCartItem(id)
        const response = await cartAPI.getUserCart();
        setCart(response)
        setLoading(false)
    }

    return (
        <>
            {loading ? <RingLoader/>: null}
            <div className="cart-main-area ptb--120 bg__white">
                <div className="container">
                    {!cart ? <h2>Cart is empty</h2> :
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <form>
                                    <div className="table-content table-responsive">

                                        <table>
                                            <thead>
                                            <tr>
                                                <th className="product-thumbnail">Image</th>
                                                <th className="product-name">Product</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-subtotal">Total</th>
                                                <th className="product-remove">Remove</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {cart.items.map((item) => (
                                                <CartItem key={item.id}
                                                          id={item.id}
                                                          price={item.price}
                                                          total={item.total}
                                                          count={item.count}
                                                          onClickRemoveCartItem={onClickRemoveCartItem}
                                                          onUpdateCartItem={onUpdateCartItem}/>
                                            ))}
                                            </tbody>
                                        </table>


                                    </div>
                                    <div className="row">
                                        <div className="col-md-8 col-sm-7 col-xs-12">
                                            <div className="buttons-cart">
                                                <input type="submit" value="Update Cart"/>
                                                <a href="/#">Continue Shopping</a>
                                            </div>
                                            <div className="coupon">
                                                <h3>Coupon</h3>
                                                <p>Enter your coupon code if you have one.</p>
                                                <input type="text" placeholder="Coupon code"/>
                                                <input type="submit" value="Apply Coupon"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-5 col-xs-12">
                                            <div className="cart_totals">
                                                <h2>Cart Totals</h2>
                                                <table>
                                                    <tbody>
                                                    <tr className="cart-subtotal">
                                                        <th>Subtotal</th>
                                                        <td><span className="amount">£215.00</span>
                                                        </td>
                                                    </tr>
                                                    <tr className="shipping">
                                                        <th>Shipping</th>
                                                        <td>
                                                            <ul id="shipping_method">
                                                                <li>
                                                                    <input type="radio"/>
                                                                    <label>
                                                                        Flat Rate: <span
                                                                        className="amount">£7.00</span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <input type="radio"/>
                                                                    <label>
                                                                        Free Shipping
                                                                    </label>
                                                                </li>
                                                                <li></li>
                                                            </ul>
                                                            <p><a
                                                                className="shipping-calculator-button"
                                                                href="/#">Calculate Shipping</a></p>
                                                        </td>
                                                    </tr>
                                                    <tr className="order-total">
                                                        <th>Total</th>
                                                        <td>
                                                            <strong><span
                                                                className="amount">£{cart.total}</span></strong>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <div className="wc-proceed-to-checkout">
                                                    <a href="/">Proceed to Checkout</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}