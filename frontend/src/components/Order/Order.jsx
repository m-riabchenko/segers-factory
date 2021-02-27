import {useForm} from "react-hook-form";
import {orderAPI} from "../../api/Order";
import React, {useContext} from "react";
import {CartContext} from "../../contexts/CartContext";
import {NavLink} from "react-router-dom";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";

export const Order = () => {
    const {register, handleSubmit} = useForm();
    const {cart, clearCart} = useContext(CartContext)

    const onSubmit = (data) => {
        return orderAPI.createOrder(data).then(() => clearCart())
            .catch(error => {
                if (error.response.status === 404) {
                    alert("Oops, you should not have created an order with an empty cart!")
                }
            })
    };
    return (
        <>
            <Breadcrumb namePage={"Order"}/>

            <section className="our-checkout-area ptb--120 bg__white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-8">
                            <div className="ckeckout-left-sidebar">
                                <div className="checkout-form">
                                    <h2 className="section-title-3">Billing details</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="checkout-form-inner">
                                            <div className="single-checkout-box">
                                                <input ref={register} name={"firstName"} type="text"
                                                       placeholder="First Name*"/>
                                                <input ref={register} name={"lastName"} type="text"
                                                       placeholder="Last Name*"/>
                                            </div>
                                            <div className="single-checkout-box">
                                                <input ref={register} name={"email"} type="email"
                                                       placeholder="Emil*"/>
                                                <input ref={register} name={"phone_number"}
                                                       type="text" placeholder="Phone*"/>
                                            </div>
                                            <div className="single-checkout-box">
                                                <textarea ref={register} name={"message"}
                                                          placeholder="Message*"> </textarea>
                                            </div>
                                            <div
                                                className="single-checkout-box select-option mt--40">
                                                <select>
                                                    <option>Country*</option>
                                                    <option>Bangladesh</option>
                                                    <option>Bangladesh</option>
                                                    <option>Bangladesh</option>
                                                    <option>Bangladesh</option>
                                                </select>
                                                <input type="text" placeholder="Company Name*"/>
                                            </div>
                                            <div className="single-checkout-box">
                                                <input ref={register} name={"address"} type="text"
                                                       placeholder="State*"/>
                                                <input ref={register} name={"zipCode"} type="text"
                                                       placeholder="Zip Code*"/>
                                            </div>
                                            <div className="single-checkout-box checkbox">
                                                <input ref={register} name={"remindMe"}
                                                       id="remind-me" type="checkbox"/>
                                                <label htmlFor="remind-me"><span></span>Create a
                                                    Account ?</label>
                                            </div>
                                        </div>
                                        <div className="review-btn">
                                            <button className="fv-btn">Order</button>
                                        </div>
                                    </form>
                                </div>
                                {/*<div className="payment-form">*/}
                                {/*    <h2 className="section-title-3">payment details</h2>*/}
                                {/*    <p>Lorem ipsum dolor sit amet, consectetur kgjhyt</p>*/}
                                {/*    <div className="payment-form-inner">*/}
                                {/*        <div className="single-checkout-box">*/}
                                {/*            <input type="text" placeholder="Name on Card*"/>*/}
                                {/*            <input type="text" placeholder="Card Number*"/>*/}
                                {/*        </div>*/}
                                {/*        <div className="single-checkout-box select-option">*/}
                                {/*            <select>*/}
                                {/*                <option>Date*</option>*/}
                                {/*                <option>Date</option>*/}
                                {/*                <option>Date</option>*/}
                                {/*                <option>Date</option>*/}
                                {/*                <option>Date</option>*/}
                                {/*            </select>*/}
                                {/*            <input type="text" placeholder="Security Code*"/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="our-payment-sestem">*/}
                                {/*    <h2 className="section-title-3">We Accept :</h2>*/}
                                {/*    <ul className="payment-menu">*/}
                                {/*        <li><a href="/#"><img src="images/payment/1.jpg"*/}
                                {/*                              alt="payment-img"/></a></li>*/}
                                {/*        <li><a href="/#"><img src="images/payment/2.jpg"*/}
                                {/*                              alt="payment-img"/></a></li>*/}
                                {/*        <li><a href="/#"><img src="images/payment/3.jpg"*/}
                                {/*                              alt="payment-img"/></a></li>*/}
                                {/*        <li><a href="/#"><img src="images/payment/4.jpg"*/}
                                {/*                              alt="payment-img"/></a></li>*/}
                                {/*        <li><a href="/#"><img src="images/payment/5.jpg"*/}
                                {/*                              alt="payment-img"/></a></li>*/}
                                {/*    </ul>*/}
                                {/*    <div className="checkout-btn">*/}
                                {/*        <a className="ts-btn btn-light btn-large hover-theme"*/}
                                {/*           href="/#">CONFIRM & BUY NOW</a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <div className="checkout-right-sidebar">
                                <div className="our-important-note">
                                    <h2 className="section-title-3">YOUR CART :</h2>
                                    <br/><br/>
                                    {!cart ? <h2>Cart is empty</h2> :
                                        <ul className="important-note">
                                            {cart.items.map(item => (
                                                <li><NavLink to={"/product/" + item.product.id}>
                                                    <i className="zmdi zmdi-caret-right-circle"> x{item.count}</i>{item.product.name}
                                                </NavLink></li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                                <div className="puick-contact-area mt--60">
                                    <h2 className="section-title-3">Quick Contract</h2>
                                    <a href="phone:+8801722889963">+012 345 678 102 </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}