import React from "react";
import {Link, NavLink} from "react-router-dom";
import {useCart} from "react-use-cart";
import {useAlert} from "react-alert";

export const ShoppingCartSidebar = ({setToggleCart}) => {
    const {
        isEmpty,
        items,
        removeItem,
        cartTotal,
    } = useCart();
    const newAlert = useAlert()
    const HOST = "http://127.0.0.1:8000"

    return (
        <>
            <div onClick={setToggleCart} className={"body__overlay is-visible"}></div>
            <div
                className={"shopping__cart shopping__cart__on"}>
                <div className="shopping__cart__inner">
                    <div className="offsetmenu__close__btn">
                        <a className={"cursor-pointer"} onClick={setToggleCart}><i
                            className="zmdi zmdi-close"></i></a>
                    </div>
                    {isEmpty ? <h2>Cart is empty</h2> : <>
                        <div className="shp__cart__wrap">
                            {items.map(item => (
                                <div className="shp__single__product" key={item.id}>
                                    <div className="shp__pro__thumb">
                                        <Link to={"/product/" + item.id}>
                                            <img
                                                src={item.images && HOST + item.images['main-image']}
                                                alt="product images"/>
                                        </Link>
                                    </div>
                                    <div className="shp__pro__details">
                                        <h2><Link to={"/product/" + item.id}>{item.name}</Link>
                                        </h2>
                                        <span className="quantity">QTY: {item.quantity}</span>
                                        <span className="shp__price">{item.itemTotal} грн.</span>
                                    </div>
                                    <div className="remove__btn">
                                        <a className={"cursor-pointer"} onClick={() => {
                                            removeItem(item.id)
                                            newAlert.show('Товар видалено із корзини', {
                                                type: 'success',
                                            })
                                        }}
                                           title="Remove this item"><i className="zmdi zmdi-close">
                                        </i></a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ul className="shoping__total">
                            <li className="subtotal">Total:</li>
                            <li className="total__price">{cartTotal} грн.</li>
                        </ul>

                        <ul className="shopping__btn">
                            <li><NavLink onClick={setToggleCart} to={"/cart"}>View Cart</NavLink>
                            </li>
                            <li className="shp__checkout"><NavLink onClick={setToggleCart}
                                                                   to={"/order"}>Checkout</NavLink>
                            </li>
                        </ul>
                    </>}

                </div>

            </div>
        </>
    );
}