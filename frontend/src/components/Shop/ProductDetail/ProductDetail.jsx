import React, {useEffect, useState} from "react";
import {productAPI} from "../../../api/ProductAPI";
import {useToggle} from "react-use";
import {Description} from "./Descriptions";
import {Review} from "./Review";
import ReactStars from "react-rating-stars-component";
import {useCart} from "react-use-cart";
import {PacmanLoader} from "react-spinners";

export const ProductDetail = (props) => {
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [on, toggle] = useToggle(true);
    const {addItem} = useCart();
    const maxQty = 100
    const minQty = 1

    useEffect(() => {
        (async () => {
            const response = await productAPI.getProductDetail(props.match.params.productId);
            setProduct(response.data)
            return response.data
        })()
    }, [props.match.params.productId])

    const quantityIncrement = () => {
        if (!(quantity >= maxQty))
            setQuantity(prev => prev + 1)
    }
    const quantityDecrement = () => {
        if (!(quantity <= minQty))
            setQuantity(prev => prev - 1)
    }
    const quantityChange = e => {
        if (Number(e.currentTarget.value) > maxQty) {
            setQuantity(maxQty)
        } else {
            setQuantity(Number(e.currentTarget.value))
        }
    }
    const HOST = "http://127.0.0.1:8000"

    if (!product) return <PacmanLoader/>

    return (
        <>
            <section className="htc__product__details pt--120 pb--100 bg__white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                            <div className="product__details__container">
                                <ul className="product__small__images" role="tablist">
                                    {product && Object.entries(product.images).map(([key, value], index) => (
                                        <li role="presentation" className="pot-small-img"
                                            key={index}>
                                            <a href="/#img-tab-2" role="tab" data-toggle="tab">
                                                <img
                                                    src={HOST + value}
                                                    alt={"photo2"}/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div className="product__big__images">
                                    <div className="portfolio-full-image tab-content">
                                        <div role="tabpanel"
                                             className="tab-pane fade in active product-video-position"
                                             id="img-tab-1">
                                            <img
                                                src={HOST + product.images['main-image']}
                                                alt={"photo2"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 smt-30 xmt-30">
                            <div className="htc__product__details__inner">
                                {/*{loading ? <PacmanLoader/> : null}*/}
                                <div className="pro__detl__title">
                                    <h2>{product.name}</h2>
                                </div>
                                {product.rating_avg &&

                                <div className="pro__dtl__rating">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={product.rating_avg}
                                        isHalf={true}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <span className="rat__qun">({product.rating_avg} Ratings)</span>
                                </div>
                                }

                                <div className="pro__details">
                                    <p>{product.description}</p>
                                </div>
                                <ul className="pro__dtl__prize">
                                    {product.sale ?
                                        <>
                                            <li className="old__prize">{product.price} грн.</li>
                                            <li>{(product.price - product.price * (product.sale / 100)).toFixed(2)} грн.</li>
                                        </>
                                        : <li>{product.price} грн.</li>
                                    }
                                </ul>
                                <div className="pro__dtl__color">
                                    <h2 className="title__5">Choose Colour</h2>
                                    <ul className="pro__choose__color">
                                        <li className="red"><a href="/#"><i
                                            className="zmdi zmdi-circle"></i></a></li>
                                        <li className="blue"><a href="/#"><i
                                            className="zmdi zmdi-circle"></i></a></li>
                                        <li className="perpal"><a href="/#"><i
                                            className="zmdi zmdi-circle"></i></a></li>
                                        <li className="yellow"><a href="/#"><i
                                            className="zmdi zmdi-circle"></i></a></li>
                                    </ul>
                                </div>
                                <div className="pro__dtl__size">
                                    <h2 className="title__5">Size</h2>
                                    <ul className="pro__choose__size">
                                        <li><a href="/#">xl</a></li>
                                        <li><a href="/#">m</a></li>
                                        <li><a href="/#">ml</a></li>
                                        <li><a href="/#">lm</a></li>
                                        <li><a href="/#">xxl</a></li>
                                    </ul>
                                </div>
                                <div className="product-action-wrap">
                                    <div className="prodict-statas"><span>Quantity :</span></div>
                                    <div className="product-quantity">
                                        <div className="product-quantity">
                                            <div className="cart-plus-minus form-row">
                                                <button onClick={quantityDecrement}
                                                        className={"btn btn-danger"}>-
                                                </button>
                                                <div className={"col-xs-4"}>
                                                    <input className="form-control"
                                                           type="number"
                                                           name="quantity"
                                                           value={quantity}
                                                           onChange={quantityChange}
                                                           onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-') && evt.preventDefault()}
                                                           min={minQty}
                                                    />
                                                </div>
                                                <button onClick={quantityIncrement}
                                                        className={"btn btn-success"}>+
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="pro__dtl__btn">
                                    <li className="buy__now__btn"><a
                                        onClick={() => addItem(product, quantity)}>buy now</a>
                                    </li>
                                    <li><a href="/#"><span className="ti-heart"></span></a></li>
                                    <li><a href="/#"><span className="ti-email"></span></a></li>
                                </ul>
                                <div className="pro__social__share">
                                    <h2>Share :</h2>
                                    <ul className="pro__soaial__link">
                                        <li><a href="/#"><i className="zmdi zmdi-twitter"></i></a>
                                        </li>
                                        <li><a href="/#"><i className="zmdi zmdi-instagram"></i></a>
                                        </li>
                                        <li><a href="/#"><i className="zmdi zmdi-facebook"></i></a>
                                        </li>
                                        <li><a href="/#"><i
                                            className="zmdi zmdi-google-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="htc__product__details__tab bg__white pb--120">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <ul className="product__deatils__tab mb--60" role="tablist">
                                <li role="presentation" className={on ? "active" : "none"}>
                                    <a onClick={() => toggle(true)} role="tab" className={"cursor-pointer"}
                                       data-toggle="tab">Description</a>
                                </li>
                                <li role="presentation" className={!on ? "active" : "none"}>
                                    <a onClick={() => toggle(false)} role="tab" className={"cursor-pointer"}
                                       data-toggle="tab">Reviews</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="product__details__tab__content">
                                {on ? <Description attributes={product.attributes}/>
                                    : <Review productId={product.id}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}