import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useCart} from "react-use-cart";
import {useAlert} from "react-alert";


export const ProductCard = ({product, HOST}) => {
    const {addItem} = useCart();
    const newAlert = useAlert()
    const getDiscount = () => {
        return (product.price - product.price * (product.sale / 100)).toFixed(2)
    }
    return (
        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12" key={product.id}>
            <div className="product">
                <div className="product__inner">
                    <div className="pro__thumb">
                        <NavLink to={"/product/" + product.id}>
                            <img src={HOST + product.images['main-image']} alt="product images"/>
                        </NavLink>
                        {product.sale !== 0 && <div className={"on-sale"}>
                            <span>Sale {product.sale}%</span>
                        </div>
                        }

                    </div>
                    <div className="product__hover__info">
                        <ul className="product__action">
                            {/*<li><a data-toggle="modal" data-target="#productModal"*/}
                            {/*       title="Quick View" className="quick-view modal-view detail-link"*/}
                            {/*       href="/#"><span className="ti-plus"></span></a></li>*/}
                            <li><a className={"cursor-pointer"} onClick={() => {
                                if (product.sale) {
                                    let productNewPrice = {...product}
                                    productNewPrice.price = getDiscount()
                                    addItem(productNewPrice)
                                } else {
                                    addItem(product)
                                }
                                newAlert.show('Товар додано у корзину', {
                                    type: 'success',
                                })
                            }}
                                   title="Add To Cart"><span
                                className="ti-plus"></span></a></li>
                            {/*<li><a title="Wishlist" href="wishlist.html"><span*/}
                            {/*    className="ti-heart"></span></a></li>*/}
                        </ul>
                    </div>
                </div>
                <div className="product__details">
                    <h2><Link to={"/product/" + product.id}>{product.name}</Link></h2>
                    <ul className="product__price">
                        {product.sale ?
                            <>
                                <li className="old__price">{product.price} грн.</li>
                                <li className="new__price">{getDiscount()} грн.</li>
                            </>
                            : <li className="new__price">{product.price} грн.</li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
