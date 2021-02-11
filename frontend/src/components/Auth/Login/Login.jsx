import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import {authAPI} from "../../../api/AuthAPI";
import {CartContext} from "../../../contexts/CartContext";


export const Login = () => {
    const {register, errors, handleSubmit} = useForm();
    const [isLoginError, setIsLoginError] = useState(false)
    const {setUserCart} = useContext(CartContext)

    const onSubmit = (data) => {
        return authAPI.login(data.email, data.password)
            .then(() => setUserCart())
            .catch(() => setIsLoginError(true))
    }

    return (
        <>
            <div className="htc__login__register bg__white ptb--130">
                <div className="container">
                    <ul className="login__register__menu" role="tablist">
                        <li role="presentation" className="register"><a href={"/"}>Login</a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            {isLoginError ?
                                <div className="alert alert-danger" role="alert">
                                    Email or password is incorrect!
                                </div> : null}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address </label>
                                    <input ref={register({required: true})} type="email"
                                           className="form-control"
                                           aria-describedby="emailHelp" name="email"/>
                                    {errors.email && errors.email.type === "required" && (
                                        <small className="form-text text-muted text-danger">
                                            <b>This isr required</b> </small>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input ref={register({required: true})} type="password"
                                           className="form-control"
                                           name="password"
                                           id="exampleInputPassword1"/>
                                    {errors.password && errors.password.type === "required" && (
                                        <small className="form-text text-muted text-danger">
                                            <b>This is required</b> </small>
                                    )}


                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input"
                                           id="exampleCheck1"/> Remember me
                                </div>

                                <button type="submit"
                                        className="btn btn-primary center-block btn-lg">Login
                                </button>
                            </form>
                            <div className="htc__social__connect">
                                <h2>Or Login With</h2>
                                <ul className="htc__soaial__list">
                                    <li><a className="bg--twitter" href="/#"><i
                                        className="zmdi zmdi-twitter"></i></a></li>
                                    <li><a className="bg--instagram" href="/#"><i
                                        className="zmdi zmdi-instagram"></i></a></li>
                                    <li><a className="bg--facebook" href="/#"><i
                                        className="zmdi zmdi-facebook"></i></a>
                                    </li>
                                    <li><a className="bg--googleplus" href="/#"><i
                                        className="zmdi zmdi-google-plus"></i></a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </>)
}