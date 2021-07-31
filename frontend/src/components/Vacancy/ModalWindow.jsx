import React from "react";
import {useForm} from "react-hook-form";
import {vacancyAPI} from "../../api/VacancyAPI";
import {useAlert} from "react-alert";

export const ModalWindow = ({toggle, vacancy}) => {
    const {register, errors, handleSubmit} = useForm()
    const newAlert = useAlert()

    const onSubmit = async data => {
        console.log(data)
        await vacancyAPI.sendResume(data, vacancy.id, data['resume'][0]).then(response => {
            toggle()
            if (response.status === 201) {
                newAlert.show('Ви відгукнулись на вакансію ' + vacancy.position, {
                    type: 'success',
                })
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={"modal"}>
                <div className="modal-content">
                    <span className="close" onClick={toggle}>&times;</span>
                    <p className={"model-head-text"}>Ви відгукуєтесь на
                        вакансію: <b>{vacancy ? vacancy.position : "Не обрано"}</b></p>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Ім'я *</label>
                        <div className="col-sm-10">
                            <input ref={register({required: true})} type="text"
                                   className="form-control" placeholder="Ім'я" name={"firstName"}/>
                            {errors.firstName && errors.firstName.type === "required" && (
                                <small className="form-text text-muted text-danger">
                                    <b>Це поле обов'язкове</b> </small>
                            )}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Прізвище *</label>
                        <div className="col-sm-10">
                            <input ref={register({required: true})} type="text"
                                   className="form-control" placeholder="Прізвище"
                                   name={"lastName"}/>
                            {errors.lastName && errors.lastName.type === "required" && (
                                <small className="form-text text-muted text-danger">
                                    <b>Це поле обов'язкове</b> </small>
                            )}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Номер телефону *</label>
                        <div className="col-sm-10">
                            <input ref={register({required: true, minLength: 8})} type="text"
                                   className="form-control" placeholder="Номер телефону"
                                   name={"phone"}/>
                            {errors.phone && errors.phone.type === "required" && (
                                <small className="form-text text-muted text-danger">
                                    <b>Це поле обов'язкове</b> </small>
                            )}
                            {errors.phone && errors.phone.type === "minLength" && (
                                <small className="form-text text-muted text-danger">
                                    <b>Некоректний номер</b> </small>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Опишіть свій досвід
                            роботи</label>
                        <textarea ref={register} className="form-control" name={"coverLetter"}
                                  rows="6"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Резюме*</label>
                        <input ref={register({required: true})} type="file"
                               className="form-control-file" name={"resume"}/>
                        {errors.resume && errors.resume.type === "required" && (
                            <small className="form-text text-muted text-danger">
                                <b>This is required</b> </small>
                        )}
                    </div>
                    <button className={"btn btn-primary center-block"}>Відправити</button>
                </div>

            </form>
        </>
    )
}