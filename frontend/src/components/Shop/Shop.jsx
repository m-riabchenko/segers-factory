import React, {useEffect, useState} from 'react';
import {ProductCard} from "./ProductCard/ProductCard";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import {productAPI} from "../../api/ProductAPI";
import {BounceLoader, PacmanLoader, RingLoader} from "react-spinners";


export function Shop() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const products_list = await productAPI.getProducts();
            setProducts(products_list)
            setLoading(false)
        })()
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
                                        <a className="filter__menu" href="/#">filter</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="product__list another-product-style">
                                {loading ? <PacmanLoader/> : null}

                                {products.map((product) => <ProductCard key={product.id}
                                                                        productId={product.id}
                                                                        name={product.name}
                                                                        price={product.price}/>)}
                            </div>
                        </div>
                        <div className="row mt--60">
                            <div className="col-md-12">
                                <div className="htc__loadmore__btn">
                                    <a href="/#">load more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
