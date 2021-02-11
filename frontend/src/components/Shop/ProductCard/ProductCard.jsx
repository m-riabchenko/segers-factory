import React, {useContext} from 'react';
import productImage from "../../../resources/images/product/1.png";
import {cartAPI} from "../../../api/CartAPI";
import {NavLink} from "react-router-dom";
import {CartContext} from "../../../contexts/CartContext";


export const ProductCard = ({productId, name, price}) => {
    const {loading, addToCart} = useContext(CartContext)

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
                            <li><a onClick={() => addToCart(productId)} title="Add To Cart"><span
                                className="ti-shopping-cart"></span></a></li>
                            <li><a title="Wishlist" href="wishlist.html"><span
                                className="ti-heart"></span></a></li>
                        </ul>
                    </div>
                </div>
                <div className="product__details">
                    <h2><a href="product-details.html">{name}</a></h2>
                    <ul className="product__price">
                        <li className="old__price">${price}</li>
                        <li className="new__price">${price}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
