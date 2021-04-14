import React, {useEffect, useRef, useState} from 'react'
import {NavLink, Link} from "react-router-dom";
import "./Header.css"
import {ShoppingCartSidebar} from "../Shop/ShoppingCart/ShoppingCartSidebar";
import logo from "../../resources/images/logo/logo.png"
import {authAPI} from "../../api/AuthAPI";
import {useToggle, useWindowScroll} from "react-use";


export const Header = () => {
    const [toggle, setToggle] = useToggle(true)
    const {x, y} = useWindowScroll();

    const logOut = () => {
        authAPI.logout()
    }
    return (
        <header id="header" className="htc-header header--3 bg__white ">
            <div id="sticky-header-with-topbar"
                 className={y === 0 ? "mainmenu__area sticky__header" : "mainmenu__area sticky__header scroll-header"}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-lg-2 col-sm-3 col-xs-3">
                            <div className="logo">
                                <a href="index.html">
                                    <img src="images/logo/logo.png" alt="logo"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-8 col-sm-6 col-xs-6">
                            <nav className="mainmenu__nav hidden-xs hidden-sm">
                                <ul className="main__menu">
                                    <li><NavLink to={""}>Home</NavLink></li>
                                    <li><NavLink to={"/shop"}>Shop</NavLink></li>
                                    <li><NavLink to={"/shop"}>Vacancies</NavLink></li>
                                    <li><NavLink to={"/shop"}>About us</NavLink></li>
                                    <li><NavLink to={"/shop"}>Contact us</NavLink></li>
                                </ul>
                            </nav>

                        </div>
                        <div className="col-md-2 col-sm-4 col-xs-3">
                            <ul className="menu-extra">
                                <li className="search search__open hidden-xs"><span
                                    className="ti-search"></span></li>
                                <li><a href="login-register.html"><span className="ti-user"></span></a>
                                </li>
                                <li className="cart__menu"><span
                                    className="ti-shopping-cart"></span></li>
                                <li className="toggle__menu visible-xs visible-sm"
                                    onClick={setToggle}><span
                                    className="ti-menu"></span></li>
                            </ul>
                        </div>
                    </div>
                    <div hidden={toggle}>
                        <div className={"visible-xs visible-sm"}>
                            <hr/>
                            <NavLink exact={true} activeClassName={"active-mobile-menu"} to={"/"}>
                                <div className={"mobile-menu-element"}>Home</div>
                            </NavLink>
                            <NavLink activeClassName={"active-mobile-menu"} to={"/shop"}>
                                <div className={"mobile-menu-element"}>Shop</div>
                            </NavLink>
                            <NavLink activeClassName={"active-mobile-menu"} to={"/dg"}>
                                <div className={"mobile-menu-element"}>Vacancies</div>
                            </NavLink>
                            <NavLink activeClassName={"active-mobile-menu"} to={"/fsg"}>
                                <div className={"mobile-menu-element"}>About us</div>
                            </NavLink>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>

        </header>
        // <>
        //     <div className="topnav" id={"Topnav"}>
        //         <NavLink className={"topnav_left"} to={""}>Home</NavLink>
        //         <NavLink className={"topnav_left"} to={"/shop"}>Shop</NavLink>
        //         <NavLink className={"topnav_left"} to={"/cart"}>Cart</NavLink>
        //         <NavLink className={"topnav_left"} to={"/order"}>Order</NavLink>
        //         <a className={"topnav_left"} onClick={onClickToggleOn}>CartSidebar</a>
        //         <NavLink className={"topnav_left"} to={"/shop"}>About Us</NavLink>
        //         <NavLink className={"topnav_left"} to={"/dashboard/category"}>Category </NavLink>
        //         <NavLink className={"topnav_left"} to={"/dashboard/product"}>Product</NavLink>
        //         <NavLink className={"topnav_right"} to={"/login"}>Login</NavLink>
        //         <NavLink className={"topnav_right"} to={"/register"}>Register</NavLink>
        //         <a className={"topnav_right"} onClick={logOut}>Logout</a>
        //
        //         <a href="/#" className="topnav icon" onClick={myFunction}>
        //             <i className="fa fa-bars"></i>
        //         </a>
        //     </div>
        //
        //     <ShoppingCartSidebar toggle={toggle} onClickToggleOff={onClickToggleOff}
        //                          setToggle={setToggle}/>
        // </>*/}
    );
}