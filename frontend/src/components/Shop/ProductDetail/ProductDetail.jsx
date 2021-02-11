import imageProduct from '../../../resources/images/product-details/small-img/1.jpg'
import bigImage from '../../../resources/images/product-details/big-img/10.jpg'
import React, {useEffect, useState} from "react";
import {productAPI} from "../../../api/ProductAPI";
import {useAsync} from "react-use";
import {PacmanLoader} from "react-spinners";

export const ProductDetail = (props) => {
    const [product, setProduct] = useState([])

    const {value, loading, error} = useAsync(async () => {
        const response = await productAPI.getProductDetail(props.match.params.productId);
        setProduct(response.data)
        return response.data
    }, [props.match.params.productId])
    return (
        <>
            <section className="htc__product__details pt--120 pb--100 bg__white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                            <div className="product__details__container">
                                <ul className="product__small__images" role="tablist">
                                    <li role="presentation" className="pot-small-img active">
                                        <a href="/#img-tab-1" role="tab" data-toggle="tab">
                                            <img src={imageProduct} alt={"photo2"}/>
                                        </a>
                                    </li>
                                    <li role="presentation" className="pot-small-img">
                                        <a href="/#img-tab-2" role="tab" data-toggle="tab">
                                            <img src={imageProduct}
                                                 alt={"photo2"}/>
                                        </a>
                                    </li>
                                    <li role="presentation" className="pot-small-img hidden-xs">
                                        <a href="/#img-tab-3" role="tab" data-toggle="tab">
                                            <img src={imageProduct} alt={"photo2"}/>
                                        </a>
                                    </li>
                                    <li role="presentation"
                                        className="pot-small-img hidden-xs hidden-sm">
                                        <a href="/#img-tab-4" role="tab" data-toggle="tab">
                                            <img src={imageProduct}
                                                 alt={"photo2"}/>
                                        </a>
                                    </li>
                                </ul>
                                <div className="product__big__images">
                                    <div className="portfolio-full-image tab-content">
                                        <div role="tabpanel"
                                             className="tab-pane fade in active product-video-position"
                                             id="img-tab-1">
                                            <img src={bigImage}
                                                 alt={"photo2"}/>
                                            <div className="product-video">
                                                <a className="video-popup"
                                                   href="https://www.youtube.com/watch?v=cDDWvj_q-o8">
                                                    <i className="zmdi zmdi-videocam"></i> View
                                                    Video
                                                </a>
                                            </div>
                                        </div>
                                        <div role="tabpanel"
                                             className="tab-pane fade product-video-position"
                                             id="img-tab-2">
                                            <img src="images/product-details/big-img/12.jpg"
                                                 alt={"photo2"}/>
                                            <div className="product-video">
                                                <a className="video-popup"
                                                   href="https://www.youtube.com/watch?v=cDDWvj_q-o8">
                                                    <i className="zmdi zmdi-videocam"></i> View
                                                    Video
                                                </a>
                                            </div>
                                        </div>
                                        <div role="tabpanel"
                                             className="tab-pane fade product-video-position"
                                             id="img-tab-3">
                                            <img src="images/product-details/big-img/11.jpg"
                                                 alt={"photo2"}/>
                                            <div className="product-video">
                                                <a className="video-popup"
                                                   href="https://www.youtube.com/watch?v=cDDWvj_q-o8">
                                                    <i className="zmdi zmdi-videocam"></i> View
                                                    Video
                                                </a>
                                            </div>
                                        </div>
                                        <div role="tabpanel"
                                             className="tab-pane fade product-video-position"
                                             id="img-tab-4">
                                            <img src="images/product-details/big-img/12.jpg"
                                                 alt={"photo2"}/>
                                            <div className="product-video">
                                                <a className="video-popup"
                                                   href="https://www.youtube.com/watch?v=cDDWvj_q-o8">
                                                    <i className="zmdi zmdi-videocam"></i> View
                                                    Video
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 smt-30 xmt-30">
                            <div className="htc__product__details__inner">
                                {loading ? <PacmanLoader/> : null}
                                <div className="pro__detl__title">
                                    <h2>{product.name}</h2>
                                </div>
                                <div className="pro__dtl__rating">
                                    <ul className="pro__rating">
                                        <li><span className="ti-star"></span></li>
                                        <li><span className="ti-star"></span></li>
                                        <li><span className="ti-star"></span></li>
                                        <li><span className="ti-star"></span></li>
                                        <li><span className="ti-star"></span></li>
                                    </ul>
                                    <span className="rat__qun">(Based on 0 Ratings)</span>
                                </div>
                                <div className="pro__details">
                                    <p>{product.description}</p>
                                </div>
                                <ul className="pro__dtl__prize">
                                    <li className="old__prize">$15.21</li>
                                    <li>${product.price}</li>
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
                                        <form id='myform' method='POST' action='#'>
                                            <div className="product-quantity">
                                                <div className="cart-plus-minus">
                                                    <input className="cart-plus-minus-box"
                                                           type="text" name="qtybutton" value="02"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <ul className="pro__dtl__btn">
                                    <li className="buy__now__btn"><a href="#">buy now</a></li>
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
        </>
    )
}