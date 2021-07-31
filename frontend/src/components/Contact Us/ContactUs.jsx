import React from "react";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import {useForm} from "react-hook-form";
import {contactAPI} from "../../api/ContactAPI";
import {useAlert} from "react-alert";

export const ContactUs = () => {
    const {register, errors, handleSubmit, reset} = useForm();
    const newAlert = useAlert()
    const onSubmit = (data) => {
        contactAPI.sendMessage(data).then(response => {
            reset()
            if (response.status === 201) {
                newAlert.show('Ви відправили повідомлення', {
                    type: 'success',
                })
            }
        })
    }


    return (
        <>
            <Breadcrumb namePage={"Контакти"}/>
            <br/>
            <br/>
            <div className={"text-center"}><h1>Контактна сторінка</h1>
                <p>ЗВ'ЯЖІТЬСЯ З НАМИ ЗРУЧНИМ СПОСОБОМ</p>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={"modal-content contact-content"}>
                <div className="form-group">
                    <label>Ваше ім'я *</label>
                    <input ref={register({required: true})} type="text" name={'fullName'} className="form-control"/>
                    {errors.fullName && errors.fullName.type === "required" && (
                                <small className="form-text text-muted text-danger">
                                    <b>Це поле обов'язкове</b> </small>
                            )}
                </div>
                <div className="form-group">
                    <label>Номер телефону *</label>
                    <input ref={register({required: true})} type="text" name={'phone'} className="form-control"/>
                    {errors.phone && errors.phone.type === "required" && (
                                <small className="form-text text-muted text-danger">
                                    <b>Це поле обов'язкове</b> </small>
                            )}
                </div>
                <div className="form-group">
                    <label>Повідомлення *</label>
                    <textarea ref={register({required: true})} className="form-control" name={"message"} rows="6"/>
                    {errors.message && errors.message.type === "required" && (
                                <small className="form-text text-muted text-danger">
                                    <b>Це поле обов'язкове</b> </small>
                            )}
                </div>
                <button className="panel-btn">Відправити</button>

            </form>
        </>
    )
}