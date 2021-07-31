import React from 'react';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {contactAPI} from "../../api/ContactAPI";
import logo from "../../resources/images/logo.png"
import {useAlert} from "react-alert";

export const Footer = (props) => {
    const {register, errors, handleSubmit, reset} = useForm();
    const newAlert = useAlert()
    const onSubmit = (data) => {
        contactAPI.subscribe(data).then(res => {
            if (res.status === 201){
                newAlert.show('Ви підписались на розсилку', {
                type: 'success',
            })
            }
            reset()
        })
    }

    return (
        <>
            <footer className="htc__foooter__area gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="footer__container clearfix">
                            <div className="col-md-3 col-lg-3 col-sm-6">
                                <div className="ft__widget">
                                    <div className="ft__logo">
                                        <Link to={"/"}>
                                            <img src={logo}
                                                 alt="footer logo"/>
                                        </Link>
                                    </div>
                                    <div className="footer-address">
                                        <ul>
                                            <li>
                                                <div className="address-icon">
                                                    <i className="zmdi zmdi-pin"></i>
                                                </div>
                                                {/* <div className="address-text">
                                                    <p>194 Main Rd T, FS Rayed VIC 3057, USA</p>
                                                </div> */}
                                            </li>
                                            <li>
                                                <div className="address-icon">
                                                    <i className="zmdi zmdi-email"></i>
                                                </div>
                                                <div className="address-text">
                                                    <p> support@segers-ukraine.ua</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="address-icon">
                                                    <i className="zmdi zmdi-phone-in-talk"></i>
                                                </div>
                                                <div className="address-text">
                                                    <p>+380 345 678 102 </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    {/*<ul className="social__icon">*/}
                                    {/*    <li><p><i className="zmdi zmdi-twitter"></i></p></li>*/}
                                    {/*    <li><p><i className="zmdi zmdi-instagram"></i></p></li>*/}
                                    {/*    <li><p><i className="zmdi zmdi-facebook"></i></p></li>*/}
                                    {/*    <li><p><i className="zmdi zmdi-google-plus"></i></p>*/}
                                    {/*    </li>*/}
                                    {/*</ul>*/}
                                </div>
                            </div>
                            <div className="col-md-3 col-lg-2 col-sm-6 smt-30 xmt-30">
                                <div className="ft__widget">
                                    <h2 className="ft__title"><b>Категорії</b></h2>
                                    <ul className="footer-categories">
                                        <li><a className={"cursor-pointer"}>Костюм робочий</a></li>
                                        <li><a className={"cursor-pointer"}>Кофта робоча</a></li>
                                        <li><a className={"cursor-pointer"}>Штани робочі</a></li>
                                        <li><a className={"cursor-pointer"}>Футболки</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-lg-2 col-sm-6 smt-30 xmt-30">
                                <div className="ft__widget">
                                    <h2 className="ft__title"><b>Інформація</b></h2>
                                    <ul className="footer-categories">
                                        <li><Link to={"/about-us"}><b>Про нас</b></Link></li>
                                        <li><Link to={"/vacancy"}><b>Вакансії</b></Link></li>
                                        <li><Link to={"/contact-us"}><b>Сторінка зворотнього зв'язку</b></Link></li>

                                    </ul>
                                </div>
                            </div>
                            <div
                                className="col-md-3 col-lg-3 col-lg-offset-1 col-sm-6 smt-30 xmt-30">
                                <div className="ft__widget">
                                    <h2 className="ft__title"><b>Новини</b></h2>
                                    <div className="newsletter__form">
                                        <p>Підпишись на нашу email росзсилку.</p>
                                        <div className="input__box">
                                            <div id="mc_embed_signup">
                                                <form onSubmit={handleSubmit(onSubmit)}
                                                      className="validate" target="_blank"
                                                      noValidate>
                                                    <div id="mc_embed_signup_scroll"
                                                         className="htc__news__inner">
                                                        <div className="news__input">
                                                            <input type="email"
                                                                   ref={register({required: true})}
                                                                   name="email"
                                                                   className="email"
                                                                   placeholder="Email Address"
                                                            />
                                                        </div>
                                                        <div className="clearfix subscribe__btn">
                                                            <input
                                                                type="submit"
                                                                value="Send"
                                                                name="subscribe"
                                                                className="bst__btn btn--white__color"/>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="htc__copyright__area">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <div className="copyright__inner">
                                    <div className="copyright">
                                        <p>© 2021 <a href="mailto:mriabchenko11@gmail.com"
                                                     title={"mriabchenko11@gmail.com"}>By Mykola
                                            Riabchenko </a>
                                            All Right Reserved.</p>
                                    </div>
                                    <ul className="footer__menu">
                                        <li><Link to={'/'}>Home</Link></li>
                                        <li><Link to={'/shop'}>Product</Link></li>
                                        <li><Link to={"/contact-us"}>Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}