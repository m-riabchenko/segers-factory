import React from 'react'
import {NavLink} from "react-router-dom";
import "./Header.css"

export const Header = () => {
    function myFunction() {
        let x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    return (
        // <header id="header" className="htc-header header--3 bg__white">
        // <div id="sticky-header-with-topbar" className="mainmenu__area sticky__header">
        // <div className="container">
        // <div className="row">
        // <div className="col-md-2 col-lg-2 col-sm-3 col-xs-3">
        // <div className="logo">
        // <a href="index.html">
        // <img src="../../resources/images/logo/logo.png" alt="logo"/>
        // </a>
        // </div>
        // </div>
        // <div className="col-md-8 col-lg-8 col-sm-6 col-xs-6">
        // <nav className="mainmenu__nav hidden-xs hidden-sm">
        // <ul className="main__menu">
        // <li className="drop"><a href="index.html">Home</a></li>
        // <li className="drop"><a
        //                                 href="portfolio-card-box-2.html">portfolio</a>
        //                                 <ul className="dropdown">
        //                                     <li><a href="portfolio-card-box-2.html">portfolio</a>
        //                                     </li>
        //                                     <li><a href="single-portfolio.html">Single portfolio</a>
        //                                     </li>
        //                                 </ul>
        //                             </li>
        //                             <li className="drop"><a href="blog.html">Blog</a>
        //                                 <ul className="dropdown">
        //                                     <li><a href="blog.html">blog 3 column</a></li>
        //                                     <li><a href="blog-details.html">Blog details</a></li>
        //                                 </ul>
        //                             </li>
        //                             <li className="drop"><NavLink to="/shop">Shop</NavLink>
        //                                 <ul className="dropdown mega_dropdown">
        //                                     <li><a className="mega__title" href="shop.html">shop
        //                                         layout</a>
        //                                         <ul className="mega__item">
        //                                             <li><a href="shop.html">default shop</a></li>
        //                                         </ul>
        //                                     </li>
        //                                     <li><a className="mega__title" href="shop.html">product
        //                                         details layout</a>
        //                                         <ul className="mega__item">
        //                                             <li><a href="product-details.html">tab style
        //                                                 1</a></li>
        //                                         </ul>
        //                                     </li>
        //                                     <li>
        //                                         <ul className="mega__item">
        //                                             <li>
        //                                                 <div className="mega-item-img">
        //                                                     <a href="shop.html">
        //                                                         <img src="images/feature-img/3.png"
        //                                                              alt="fsd"/>
        //                                                     </a>
        //                                                 </div>
        //                                             </li>
        //                                         </ul>
        //                                     </li>
        //                                 </ul>
        //                             </li>
        //                             <li className="drop"><a href={"/"}>pages</a>
        //                                 <ul className="dropdown">
        //                                     <li><a href="about.html">about</a></li>
        //                                     <li><p>testimonials <span><i
        //                                         className="zmdi zmdi-chevron-right"></i></span></p>
        //                                         <ul className="lavel-dropdown">
        //                                             <li><a href="customer-review.html">customer
        //                                                 review</a></li>
        //                                         </ul>
        //                                     </li>
        //                                     <li><a href="shop.html">shop</a></li>
        //                                     <li><a href="shop-sidebar.html">shop sidebar</a></li>
        //                                     <li><a href="product-details.html">product details</a>
        //                                     </li>
        //                                     <li><a href="cart.html">cart</a></li>
        //                                     <li><a href="wishlist.html">wishlist</a></li>
        //                                     <li><a href="checkout.html">checkout</a></li>
        //                                     <li><a href="team.html">team</a></li>
        //                                     <li><NavLink to={"/login"}>login & register</NavLink>
        //                                     </li>
        //                                 </ul>
        //                             </li>
        //                             <li><a href="contact.html">contact</a></li>
        //                         </ul>
        //                     </nav>
        //                     <div className="mobile-menu clearfix visible-xs visible-sm">
        //                         <nav id="mobile_dropdown">
        //                             <ul>
        //                                 <li><a href="index.html">Home</a></li>
        //                                 <li><p>portfolio</p>
        //                                     <ul>
        //                                         <li><a
        //                                             href="portfolio-card-box-2.html">portfolio</a>
        //                                         </li>
        //                                         <li><a href="single-portfolio.html">Single
        //                                             portfolio</a></li>
        //                                     </ul>
        //                                 </li>
        //                                 <li><a href="blog.html">blog</a>
        //                                     <ul>
        //                                         <li><a href="blog.html">blog 3 column</a></li>
        //                                         <li><a href="blog-details.html">Blog details</a>
        //                                         </li>
        //                                     </ul>
        //                                 </li>
        //                                 <li><p>pages</p>
        //                                     <ul>
        //                                         <li><a href="about.html">about</a></li>
        //                                         <li><a href="customer-review.html">customer
        //                                             review</a></li>
        //                                         <li><a href="shop.html">shop</a></li>
        //                                         <li><a href="shop-sidebar.html">shop sidebar</a>
        //                                         </li>
        //                                         <li><a href="product-details.html">product
        //                                             details</a></li>
        //                                         <li><a href="cart.html">cart</a></li>
        //                                         <li><a href="wishlist.html">wishlist</a></li>
        //                                         <li><a href="checkout.html">checkout</a></li>
        //                                         <li><a href="team.html">team</a></li>
        //                                         <li><NavLink to={"/login"}>login &
        //                                             register</NavLink></li>
        //                                     </ul>
        //                                 </li>
        //                                 <li><a href="contact.html">contact</a></li>
        //                             </ul>
        //                         </nav>
        //                     </div>
        //                 </div>
        //                 <div className="col-md-2 col-sm-4 col-xs-3">
        //                     <ul className="menu-extra">
        //                         <li className="search search__open hidden-xs">
        //                             <span className="ti-search"> </span></li>
        //                         <li><NavLink to={"/login"}>
        //                             <span className="ti-user"> </span></NavLink>
        //                         </li>
        //                         <li className="cart__menu">
        //                             <span className="ti-shopping-cart"> </span></li>
        //                         <li className="toggle__menu hidden-xs hidden-sm">
        //                             <span className="ti-menu"> </span></li>
        //                     </ul>
        //                 </div>
        //             </div>
        //             <div className="mobile-menu-area"> </div>
        //         </div>
        //     </div>
        // </header>
        <>
            <div className="topnav" id={"myTopnav"}>

                <NavLink className={"topnav_left"} to={""}>Home</NavLink>
                <NavLink className={"topnav_left"} to={"/shop"}>Shop</NavLink>
                <NavLink className={"topnav_left"} to={"/cart"}>Cart</NavLink>
                <NavLink className={"topnav_left"} to={"/shop"}>Contact</NavLink>
                <NavLink className={"topnav_left"} to={"/shop"}>Services</NavLink>
                <NavLink className={"topnav_left"} to={"/shop"}>About Us</NavLink>
                <NavLink className={"topnav_right"} to={"/login"}>Login</NavLink>
                <NavLink className={"topnav_right"} to={"/register"}>Register</NavLink>
                <a href="javascript:void(0);" className="icon" onClick={myFunction}>
                    <i className="fa fa-bars"></i>
                </a>


            </div>

        </>
    );
}