import {CartItem} from "./CartItem";
import React from "react";
import {RingLoader} from "react-spinners";
import {Link} from "react-router-dom";
import {Breadcrumb} from "../../Breadcrumb/Breadcrumb";
import {useCart} from "react-use-cart";

export const ShoppingCart = () => {
    const {
        isEmpty,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
        onItemUpdate,
    } = useCart();

    console.log(items)
    if (isEmpty) return <h2>Cart is empty</h2>;
    return (
        <>
            <Breadcrumb namePage={"Cart"}/>

            {onItemUpdate ? <RingLoader/> : null}
            <div className="cart-main-area ptb--120 bg__white">
                <div className="container">
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
                                            {items.map((item) => (
                                                <CartItem key={item.id}
                                                          item={item}
                                                          onClickRemoveCartItem={removeItem}
                                                          onUpdateCartItem={updateItemQuantity}/>
                                            ))}
                                            </tbody>
                                        </table>


                                    </div>
                                    <div className="row">
                                        <div className="col-md-8 col-sm-7 col-xs-12">
                                            <div className="buttons-cart">
                                                <input type={"submit"} value="Update Cart"/>
                                                <Link to={"/shop"}>Continue Shopping</Link>
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
                                                    <tr className="order-total">
                                                        <th>Total</th>
                                                        <td>
                                                            <strong><span
                                                                className={onItemUpdate ? "amount-red" : "amount"}>{cartTotal} грн.</span></strong>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <div className="wc-proceed-to-checkout">
                                                    <Link to={"/order"}>Proceed to Checkout</Link>
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