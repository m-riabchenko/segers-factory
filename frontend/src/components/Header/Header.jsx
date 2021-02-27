import React, {useEffect, useRef, useState} from 'react'
import {NavLink} from "react-router-dom";
import "./Header.css"
import {ShoppingCartSidebar} from "../Shop/ShoppingCart/ShoppingCartSidebar";
import logo from "../../resources/images/logo/logo.png"


export const Header = () => {
    const [toggle, setToggle] = useState(false)

    const onClickToggleOff = () => {
        setToggle(false)
    }
    const onClickToggleOn = () => {
        setToggle(true)
    }


    function myFunction() {
        let x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    return (

        <>
            <div className="topnav" id={"myTopnav"}>
                <NavLink className={"topnav_left"} to={""}>Home</NavLink>
                <NavLink className={"topnav_left"} to={"/shop"}>Shop</NavLink>
                <NavLink className={"topnav_left"} to={"/cart"}>Cart</NavLink>
                <NavLink className={"topnav_left"} to={"/order"}>Order</NavLink>
                <a className={"topnav_left"} onClick={onClickToggleOn}>CartSidebar</a>
                <NavLink className={"topnav_left"} to={"/shop"}>About Us</NavLink>
                <NavLink className={"topnav_left"} to={"/dashboard/category"}>Category </NavLink>
                <NavLink className={"topnav_left"} to={"/dashboard/product"}>Product</NavLink>
                <NavLink className={"topnav_right"} to={"/login"}>Login</NavLink>
                <NavLink className={"topnav_right"} to={"/register"}>Register</NavLink>
                <a href="/#" className="topnav icon" onClick={myFunction}>
                    <i className="fa fa-bars"></i>
                </a>
            </div>

            <ShoppingCartSidebar toggle={toggle} onClickToggleOff={onClickToggleOff}
                                 setToggle={setToggle}/>
        </>
    );
}