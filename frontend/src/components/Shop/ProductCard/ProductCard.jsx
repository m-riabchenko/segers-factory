import React from 'react';
import productImage from "../../../resources/images/product/1.png";
import {cartAPI} from "../../../api/CartAPI";
import {NavLink} from "react-router-dom";


export const ProductCard = ({productId, name, price}) => {
    const onClickAddToCart = async () => {
        return await cartAPI.addProductToCart(productId)
    }


    return (
        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12">
            <div className="product">
                <div className="product__inner">
                    <div className="pro__thumb">
                         <NavLink to={"/product/" + productId}>
                            <img src={productImage} alt="product images"/>
                        </NavLink>
                    </div>
                    <div className="product__hover__info">
                        <ul className="product__action">
                            <li><a data-toggle="modal" data-target="#productModal"
                                   title="Quick View" className="quick-view modal-view detail-link"
                                   href="/#"><span className="ti-plus"></span></a></li>
                            <li><a onClick={onClickAddToCart} title="Add To Cart" href="cart.html"><span
                                className="ti-shopping-cart"></span></a></li>
                            <li><a title="Wishlist" href="wishlist.html"><span
                                className="ti-heart"></span></a></li>
                        </ul>
                    </div>
                </div>
                <div className="product__details">
                    <h2><a href="product-details.html">Simple Black Clock</a></h2>
                    <ul className="product__price">
                        <li className="old__price">$16.00</li>
                        <li className="new__price">${price}</li>
                    </ul>
                </div>
            </div>
        </div>
        // <div className="col-md-3 single__pro col-lg-3 cat--1 col-sm-4 col-xs-12">
        //     <div className="product foo">
        //         <div className="product__inner">
        //             <div className="pro__thumb">
        //                 <NavLink to={"/product/" + productId}>
        //                     <img src={image}
        //                          alt="product ../../resources/images"/>
        //                 </NavLink>
        //             </div>
        //             <div className="product__hover__info">
        //                 <ul className="product__action">
        //                     <li><a data-toggle="modal"
        //                            data-target="#productModal"
        //                            title="Quick View"
        //                            className="quick-view modal-view detail-link"
        //                            href={"/"}>
        //                         <span className="ti-plus"> </span></a>
        //                     </li>
        //                     <li><a onClick={onClickAddToCart}
        //                            title="Add TO Cart"
        //                            href="/shop#">
        //                         <span className="ti-shopping-cart"> </span></a>
        //                     </li>
        //                     <li><a title="Wishlist"
        //                            href="wishlist.html">
        //                         <span className="ti-heart"> </span></a></li>
        //                 </ul>
        //             </div>
        //         </div>
        //         <div className="product__details">
        //             <h2><a href="product-details.html">{name}</a></h2>
        //             <ul className="product__price">
        //                 <li className="old__price">$16.00</li>
        //                 <li className="new__price">${price}</li>
        //             </ul>
        //         </div>
        //     </div>
        // </div>
    );
}
