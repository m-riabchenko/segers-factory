import React, {useContext} from "react";
import {CartContext} from "../../../contexts/CartContext";
import {NavLink} from "react-router-dom";

export const ShoppingCartSidebar = ({toggle, onClickToggleOff}) => {
    const {cart, loading, removeCartItem} = useContext(CartContext)
    return (
        <>
            <div onClick={() => onClickToggleOff(false)}
                 className={toggle ? "body__overlay is-visible" : "body__overlay"}>
            </div>
            <div
                className={toggle ? "shopping__cart shopping__cart__on" : "shopping__cart hidden-xs"}>
                <div className="shopping__cart__inner">
                    <div className="offsetmenu__close__btn">
                        <a className={"cursor-pointer"} onClick={onClickToggleOff}><i className="zmdi zmdi-close"></i></a>
                    </div>
                    {cart.items.length === 0 ? <h2>Cart is empty</h2> : <div>
                        <div className="shp__cart__wrap">
                            {cart.items.map(item => (
                                <div className="shp__single__product" key={item.id}>
                                    <div className="shp__pro__thumb">
                                        <a href="/#">
                                            <img src="images/product/sm-img/1.jpg"
                                                 alt="product images"/>
                                        </a>
                                    </div>
                                    <div className="shp__pro__details">
                                        <h2><a href="product-details.html">{item.product.name}</a>
                                        </h2>
                                        <span className="quantity">QTY: {item.count}</span>
                                        <span className="shp__price">${item.total}</span>
                                    </div>
                                    <div className="remove__btn">
                                        <a onClick={() => removeCartItem(item.id)} href={"/cart#"}
                                           title="Remove this item"><i
                                            className="zmdi zmdi-close"></i></a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ul className="shoping__total">
                            <li className="subtotal">Subtotal:</li>
                            <li className="total__price">${cart.total}</li>
                        </ul>

                        <ul className="shopping__btn">
                            <li><NavLink onClick={onClickToggleOff} to={"/cart"}>View Cart</NavLink>
                            </li>
                            <li className="shp__checkout"><NavLink onClick={onClickToggleOff}
                                                                   to={"/order"}>Checkout</NavLink>
                            </li>
                        </ul>
                    </div>
                    }

                </div>

            </div>
        </>
    );
}