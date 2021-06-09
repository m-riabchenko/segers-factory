import React from 'react'
import {NavLink, Link} from "react-router-dom";
import "./Header.css"
import {ShoppingCartSidebar} from "../Shop/ShoppingCart/ShoppingCartSidebar";
import {useToggle, useWindowScroll} from "react-use";
import logo from "../../resources/images/logo.png"

export const Header = () => {
    const [toggle, setToggle] = useToggle(true)
    const [toggleCart, setToggleCart] = useToggle(false)
    const {x, y} = useWindowScroll();

    return (
        <>
            <header id="header" className="htc-header header--3 bg__white ">
                <div id="sticky-header-with-topbar"
                     className={y === 0 ? "mainmenu__area sticky__header" : "mainmenu__area sticky__header scroll-header"}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2 col-lg-2 col-sm-3 col-xs-3">
                                <div className="logo">
                                    <Link to={"/"}>
                                        <img src={logo} alt="logo"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-8 col-lg-8 col-sm-6 col-xs-6">
                                <nav className="mainmenu__nav hidden-xs hidden-sm">
                                    <ul className="main__menu">
                                        <li><NavLink to={""}><b>Головна</b></NavLink></li>
                                        <li><NavLink to={"/shop"}><b>Магазин</b></NavLink></li>
                                        <li><NavLink to={"/vacancy"}><b>Вакансії</b></NavLink></li>
                                        <li><NavLink to={"/about-us"}><b>Про нас</b></NavLink></li>
                                        <li><NavLink to={"/contact-us"}><b>Контакти</b></NavLink></li>
                                    </ul>
                                </nav>

                            </div>
                            <div className="col-md-2 col-sm-4 col-xs-3">
                                <ul className="menu-extra">
                                    {/*<li className="search search__open hidden-xs"><span*/}
                                    {/*    className="ti-search"></span></li>*/}
                                    <li><Link to={"/login"}><span
                                        className="ti-user"></span></Link>
                                    </li>
                                    <li className="cart__menu" onClick={setToggleCart}><span
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
                                <NavLink exact={true} activeClassName={"active-mobile-menu"}
                                         to={"/"} onClick={setToggle}>
                                    <div className={"mobile-menu-element"}>Головна</div>
                                </NavLink>
                                <NavLink activeClassName={"active-mobile-menu"} to={"/shop"}
                                         onClick={setToggle}>
                                    <div className={"mobile-menu-element"}>Магазин</div>
                                </NavLink>
                                <NavLink activeClassName={"active-mobile-menu"} to={"/vacancy"}
                                         onClick={setToggle}>
                                    <div className={"mobile-menu-element"}>Вакансії</div>
                                </NavLink>
                                <NavLink activeClassName={"active-mobile-menu"} to={"/about-us"}
                                         onClick={setToggle}>
                                    <div className={"mobile-menu-element"}>Про нас</div>
                                </NavLink>
                                <NavLink activeClassName={"active-mobile-menu"} to={"/contact-us"}
                                         onClick={setToggle}>
                                    <div className={"mobile-menu-element"}>Контакти</div>
                                </NavLink>

                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </header>

            {toggleCart && <ShoppingCartSidebar setToggleCart={setToggleCart}/>}

        </>
    );
}