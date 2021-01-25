import React from 'react';
import {authAPI} from "../../../api/AuthAPI";
import {useForm} from "react-hook-form";


export const Register = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data)
        return authAPI.register(data.email, data.password)
    }

    return (
        <div className="htc__login__register bg__white ptb--130">
            <div className="container">
                <ul className="login__register__menu" role="tablist">
                    <li role="presentation" className="register"><a href="/">Register</a>
                    </li>
                </ul>

                <div className="row">
                    <div className="col-md-6 col-md-offset-3">

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address </label>
                                <input ref={register} type="email" className="form-control"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp" name="email"/>
                                <small id="emailHelp"
                                       className="form-text text-muted">errors</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input ref={register} type="password"
                                       className="form-control"
                                       name="password"/>
                                <small id="emailHelp"
                                       className="form-text text-muted">errors</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password
                                    confirmation</label>
                                <input ref={register} type="password" className="form-control"
                                       name="password2"
                                />
                                <small id="emailHelp"
                                       className="form-text text-muted">errors</small>
                            </div>
                            <button type="submit"
                                    className="btn btn-primary center-block btn-lg">Register
                            </button>
                        </form>
                        <div className="htc__social__connect">
                            <h2>Or Login With</h2>
                            <ul className="htc__soaial__list">
                                <li><a className="bg--twitter" href="/#">
                                    <i className="zmdi zmdi-twitter"> </i></a></li>
                                <li><a className="bg--instagram" href="/#">
                                    <i className="zmdi zmdi-instagram"> </i></a></li>
                                <li><a className="bg--facebook" href="/#">
                                    <i className="zmdi zmdi-facebook"> </i></a>
                                </li>
                                <li><a className="bg--googleplus" href="/#">
                                    <i className="zmdi zmdi-google-plus"> </i></a></li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}