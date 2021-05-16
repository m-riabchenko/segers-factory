import {useForm} from "react-hook-form";
import {orderAPI} from "../../api/OrderAPI";
import React from "react";
import {NavLink} from "react-router-dom";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import {useCart} from "react-use-cart";
import {useToggle} from "react-use";
import {useAlert} from "react-alert";

export const Order = () => {
    const [onDelivery, toggleDelivery] = useToggle()
    const {register, handleSubmit, reset} = useForm();
    const {items, removeItem, isEmpty} = useCart();
    const newAlert = useAlert()
    const onSubmit = (data) => {
        return orderAPI.createOrder(data, onDelivery, items).then(response => {
            items.forEach(item => removeItem(item.id))
            reset()
            if (response.status === 201) {
                newAlert.show('Ваше замовлення прийнято в обробку', {
                    type: 'success',
                })
            }
            else {
                newAlert.show('Щось пішло не так. Спробуйте пізніше', {
                    type: 'error',
                })
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
                                    <h2 className="section-title-3">Платіжні дані</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="checkout-form-inner">
                                            <div className="single-checkout-box">
                                                <input ref={register} name={"firstName"} type="text"
                                                       placeholder="Ім'я*"/>
                                                <input ref={register} name={"lastName"} type="text"
                                                       placeholder="Прізвище*"/>
                                            </div>
                                            <div className="single-checkout-box">
                                                <input ref={register} name={"email"} type="email"
                                                       placeholder="Emil*"/>
                                                <input ref={register} name={"phoneNumber"}
                                                       type="text" placeholder="Phone*"/>
                                            </div>
                                            <div className="single-checkout-box">
                                                <textarea ref={register} name={"messageOrder"}
                                                          placeholder="Message*"></textarea>
                                            </div>
                                            <div onClick={toggleDelivery}>
                                                <input type="checkbox"
                                                       className={"float-right-style"} style={{
                                                    "margin-right": "10px",
                                                    "transform": "scale(1.5)"
                                                }} checked={onDelivery}/>
                                                <h2 className="section-title-3 mt--20">
                                                    Доставити на іншу адресу?</h2>
                                            </div>
                                            {onDelivery && <>
                                                <div
                                                    className="single-checkout-box select-option  mt--20">
                                                    <input ref={register} name={"streetNumber"}
                                                           type="text"
                                                           placeholder="Номер вулиці*"/>
                                                    <input ref={register} name={"houseNumber"}
                                                           type="text"
                                                           placeholder="Квартира/офіс/блок тощо (необов'язково)"/>
                                                </div>
                                                <div className="single-checkout-box">
                                                    <input ref={register} name={"city"}
                                                           type="text"
                                                           placeholder="Місто/село*"/>
                                                    <input ref={register} name={"region"}
                                                           type="text"
                                                           placeholder="Область/округ*"/>
                                                </div>
                                                <div className="single-checkout-box">
                                                    <input ref={register} name={"zipCode"}
                                                           type="text"
                                                           placeholder="Поштовий код (Zip Code)*"/>
                                                </div>
                                                <div className="single-checkout-box">
                                                    <textarea ref={register}
                                                              name={"messageDelivery"}
                                                              placeholder="Нотатки до вашого замовлення, наприклад спеціальні примітки для доставки (необов'язково)"></textarea>
                                                </div>
                                            </>}
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
                                    <h2 className="section-title-3">Ваша корзина :</h2>
                                    <br/><br/>
                                    {isEmpty ? <h2>Cart is empty</h2> :
                                        <ul className="important-note">
                                            {items.map(item => (
                                                <li><NavLink to={"/product/" + item.id}>
                                                    <i className="zmdi zmdi-caret-right-circle"> x{item.quantity}</i>{item.name}
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