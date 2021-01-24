import React, {useEffect, useState} from 'react';
import {GoodCard} from "./GoodCard/GoodCard";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import {productAPI} from "../../api/ProductAPI";

export function Shop() {
    const [product, setProduct] = useState([])

    useEffect(async () => {
        const products = await productAPI.getProduct();
        console.log(products);
        setProduct(products)
    }, [])

    return (
        <>
            <Breadcrumb/>
            <section className="htc__product__area shop__page ptb--130 bg__white">
                <div className="container">
                    <div className="htc__product__container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="filter__menu__container">
                                    <div className="filter__box">
                                        <a className="filter__menu" href="#">filter</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="product__list another-product-style">
                                {product.map((product) => <GoodCard name={product.name} price={product.price}/>)}
                            </div>
                        </div>
                        <div className="row mt--60">
                            <div className="col-md-12">
                                <div className="htc__loadmore__btn">
                                    <a href="#">load more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
