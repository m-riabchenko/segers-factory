import React, {useRef, useState} from 'react';
import {authAPI} from "../../../api/AuthAPI";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router";


export const Register = () => {
    const {register, errors, handleSubmit, watch} = useForm()
    const password = useRef({});
    password.current = watch("password", "");

    const [errorRegister, setErrorRegister] = useState(null)
    let history = useHistory();


    const onSubmit = (data) => {
        authAPI.register(data.email, data.password).then(response => {
            if (response.status === 201) {
                history.push("/home");
            }
        }).catch(error => {
            if (error.response.status === 400) {
                setErrorRegister("Email or password is incorrect!")
            }
        })
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

                        {errorRegister ? <div className="alert alert-danger"
                                              role="alert">⚠ {errorRegister}</div> : null}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address </label>
                                <input ref={register({required: "This is required"})} type="email"
                                       className="form-control"
                                       aria-describedby="emailHelp" name="email"/>
                                {errors.email &&
                                <small className="form-text text-muted text-danger">
                                    <b>⚠ {errors.email.message}</b> </small>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input ref={register({
                                    required: "You must specify a password",
                                    minLength: {
                                        value: 8,
                                        message: "Password must have at least 8 characters"
                                    }
                                })} type="password"
                                       className="form-control"
                                       name="password"/>
                                {errors.password && <small className="form-text text-muted text-danger">
                                    <b>⚠ {errors.password.message}</b> </small>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password
                                    confirmation</label>
                                <input ref={register({
                                    validate: value =>
                                        value === password.current || "The passwords do not match"
                                })} type="password"
                                       className="form-control"
                                       name="password_repeat"
                                />
                                {errors.password_repeat && <small className="form-text text-muted text-danger">
                                    <b>⚠ {errors.password_repeat.message}</b> </small>}
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