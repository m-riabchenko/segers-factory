import {useForm} from "react-hook-form";
import {orderAPI} from "../../api/OrderAPI";
import React from "react";
import {NavLink} from "react-router-dom";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import {useCart} from "react-use-cart";
import {useToggle} from "react-use";
import {useAlert} from "react-alert";
import {useHistory} from "react-router";


export const Order = () => {
    const [onDelivery, toggleDelivery] = useToggle(false)
    const {register, errors, handleSubmit, reset} = useForm();
    const {items, removeItem, isEmpty} = useCart();
    const newAlert = useAlert()
    const history = useHistory()
    const onSubmit = (data) => {

        return orderAPI.createOrder(data, onDelivery, items).then(response => {
            items.forEach(item => removeItem(item.id))
            reset()
            if (response.status === 201) {
                newAlert.show('Ваше замовлення прийнято в обробку', {
                    type: 'success',
                })
                history.push("/shop")
            } else {
                newAlert.show('Щось пішло не так. Спробуйте пізніше', {
                    type: 'error',
                })
            }

        })
    };
    return (
        <>
            <Breadcrumb namePage={"Оформлення замовлення"}/>

            <section className="our-checkout-area ptb--120 bg__white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-8">
                            <div className="ckeckout-left-sidebar">
                                <div className="checkout-form">
                                    <h2 className="section-title-3">ПЛАТІЖНІ ДАНІ</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="checkout-form-inner">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">Ім'я
                                                    *</label>
                                                <div className="col-sm-8">
                                                    <input ref={register({required: true})}
                                                           type="text"
                                                           className="form-control"
                                                           placeholder="Введіть ім'я*"
                                                           name={"firstName"}/>
                                                    {errors.firstName && errors.firstName.type === "required" && (
                                                        <small
                                                            className="form-text text-muted text-danger">
                                                            <b>Це поле обов'язкове!</b> </small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label
                                                    className="col-sm-4 col-form-label">Прізвище*</label>
                                                <div className="col-sm-8">
                                                    <input ref={register({required: true})}
                                                           type="text"
                                                           className="form-control"
                                                           placeholder="Введіть прізвище*"
                                                           name={"lastName"}/>
                                                    {errors.lastName && errors.lastName.type === "required" && (
                                                        <small
                                                            className="form-text text-muted text-danger">
                                                            <b>Це поле обов'язкове!</b> </small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label
                                                    className="col-sm-4 col-form-label">Email*</label>
                                                <div className="col-sm-8">
                                                    <input ref={register({required: true})}
                                                           type="email"
                                                           className="form-control"
                                                           placeholder="Введіть email*"
                                                           name={"email"}/>
                                                    {errors.email && errors.email.type === "required" && (
                                                        <small
                                                            className="form-text text-muted text-danger">
                                                            <b>Це поле обов'язкове!</b> </small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">Номер
                                                    телефону *</label>
                                                <div className="col-sm-8">
                                                    <input ref={register({required: true})}
                                                           type="text"
                                                           className="form-control"
                                                           placeholder="Введіть номер телефону*"
                                                           name={"phoneNumber"}/>
                                                    {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                                                        <small
                                                            className="form-text text-muted text-danger">
                                                            <b>Це поле обов'язкове!</b> </small>
                                                    )}

                                                </div>
                                            </div>

                                            <div className="single-checkout-box">
                                                <textarea ref={register} name={"messageOrder"}
                                                          placeholder="Повідомлення"></textarea>
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
                                                <div className="form-group row mt--20">
                                                    <label className="col-sm-4 col-form-label">Номер
                                                        вулиці*</label>
                                                    <div className="col-sm-8">
                                                        <input ref={register({required: true})}
                                                               type="text"
                                                               className="form-control"
                                                               placeholder="Введіть номер вулиці*"
                                                               name={"streetNumber"}/>
                                                        {errors.streetNumber && errors.streetNumber.type === "required" && (
                                                            <small
                                                                className="form-text text-muted text-danger">
                                                                <b>Це поле обов'язкове!</b> </small>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-group row ">
                                                    <label
                                                        className="col-sm-4 col-form-label">Квартира/офіс/блок</label>
                                                    <div className="col-sm-8">
                                                        <input ref={register}
                                                               type="text"
                                                               className="form-control"
                                                               placeholder="Квартира/офіс/блок (необов'язково)"
                                                               name={"houseNumber"}/>
                                                    </div>
                                                </div>

                                                <div className="form-group row ">
                                                    <label
                                                        className="col-sm-4 col-form-label">Місто/село*</label>
                                                    <div className="col-sm-8">
                                                        <input ref={register({required: true})}
                                                               type="text"
                                                               className="form-control"
                                                               placeholder="Введіть Місто/село*"
                                                               name={"city"}/>
                                                        {errors.city && errors.city.type === "required" && (
                                                            <small
                                                                className="form-text text-muted text-danger">
                                                                <b>Це поле обов'язкове!</b> </small>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="form-group row ">
                                                    <label
                                                        className="col-sm-4 col-form-label">Область/округ*</label>
                                                    <div className="col-sm-8">
                                                        <input ref={register({required: true})}
                                                               type="text"
                                                               className="form-control"
                                                               placeholder="Введіть Область/округ*"
                                                               name={"region"}/>
                                                        {errors.region && errors.region.type === "required" && (
                                                            <small
                                                                className="form-text text-muted text-danger">
                                                                <b>Це поле обов'язкове!</b> </small>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="form-group row ">
                                                    <label className="col-sm-4 col-form-label">Поштовий
                                                        код (Zip Code)*</label>
                                                    <div className="col-sm-8">
                                                        <input ref={register({required: true})}
                                                               type="text"
                                                               className="form-control"
                                                               placeholder="Введіть Поштовий код (Zip Code)*"
                                                               name={"zipCode"}/>
                                                        {errors.zipCode && errors.zipCode.type === "required" && (
                                                            <small
                                                                className="form-text text-muted text-danger">
                                                                <b>Це поле обов'язкове!</b> </small>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="single-checkout-box">
                                                    <textarea ref={register}
                                                              name={"messageDelivery"}
                                                              placeholder="Нотатки до вашого замовлення, наприклад спеціальні примітки для доставки (необов'язково)"></textarea>
                                                </div>
                                            </>}
                                        </div>
                                        <div className="review-btn">
                                            <button className="fv-btn">Замовлення</button>
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
                                    {isEmpty ? <h2>Пусто</h2> :
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
                                    <h2 className="section-title-3">Швидкий зв'язок</h2>
                                    <a href="phone:+8801722889963">+380 345 678 102 </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}