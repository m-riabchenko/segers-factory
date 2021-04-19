import React from "react";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import {useForm} from "react-hook-form";
import {contactAPI} from "../../api/ContactAPI";

export const ContactUs = () => {
    const {register, errors, handleSubmit, reset} = useForm();

    const onSubmit = (data) => {
        console.log(data)
        contactAPI.sendMessage(data).then(reset())
    }


    return (
        <>
            <Breadcrumb namePage={"Contact Us"}/>
            <br/>
            <br/>
            <div className={"text-center"}><h1>Контактна сторінка</h1>
                <p>ЗВ'ЯЖІТЬСЯ З НАМИ ЗРУЧНИМ СПОСОБОМ</p>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={"modal-content contact-content"}>
                <div className="form-group">
                    <label>Ваше ім' *</label>
                    <input ref={register} type="text" name={'fullName'} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Номер телефону *</label>
                    <input ref={register} type="text" name={'phone'} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Повідомлення *</label>
                    <textarea ref={register} className="form-control" name={"message"} rows="6"/>
                </div>
                <button className="panel-btn" >Відправити</button>

            </form>
        </>
    )
}