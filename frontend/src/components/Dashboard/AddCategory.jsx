import React, {useState} from "react";
import {useFieldArray, Controller, useForm} from "react-hook-form";
import {categoryAPI} from "../../api/CategoryAPI";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import {useAsync} from "react-use";
import Select from "react-select/";
import {useAlert} from "react-alert";
import {useHistory} from "react-router";
import {verify_token} from "../../api/utils";
import {Link} from "react-router-dom";


export const AddCategory = () => {
    const {register, errors, control, handleSubmit} = useForm()
    const newAlert = useAlert()
    const {fields, append, remove} = useFieldArray({
        control,
        name: "attributes",
    })
    let history = useHistory();


    const onSubmit = async data => {
        let schema_attributes = data.attributes.map(item => {
            item.type = item.type['value']
            return item
        })
        let response = await categoryAPI.createCategory(data.category, schema_attributes, data.parent)


        if (response.status === 201) {
            newAlert.show('Категорію "' + data.category + '" додано', {
                type: 'success',
            })
        }

    }


    const {value, loading, error} = useAsync(async () => {
        return await categoryAPI.getCategories();
    }, [])

    return (
        <>
            <Breadcrumb namePage={"Створення категорій"}/>
            <div className="container mt--60 mb--20">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <section className="panel panel-default">
                            <div className={"text_header"}>Основна інформація</div>
                            <hr/>
                            <div className="panel-body">
                                <div className="form-group col-md-6">
                                    <label>Ім'я категорії</label>
                                    <input type="text" className="form-control"
                                           ref={register({required: true})}
                                           name="category"
                                           placeholder="Enter category name"/>
                                    {errors.category && errors.category.type === "required" && (
                                        <small className="form-text text-muted text-danger">
                                            <b>Це поле обов'язкове</b> </small>
                                    )}
                                    {/*<small className="form-text text-muted">\.</small>*/}
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="exampleFormControlSelect1">Виберіть категорію
                                        для якої створювана категорія буде підкатегорією </label>
                                    <Controller
                                        as={Select}
                                        control={control}
                                        options={value && value.map(category => {
                                            return {"value": category.id, "label": category.name}
                                        })}
                                        name={"parent"}
                                        isClearable
                                        controlShouldRenderValue={true}
                                        defaultValue={null}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                    <section className="panel panel-default">
                        <div className={"text_header"}>Атрибути</div>
                        <hr/>
                        <div className="panel-body">

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Ім'я атрибуту</label>
                                </div>
                                {/*<div className="form-group col-md-4">*/}
                                {/*    <label htmlFor="inputEmail4">Дод.(необов`язково)</label>*/}
                                {/*</div>*/}
                                <div className="form-group col-md-5">
                                    <label htmlFor="exampleFormControlSelect1">Виберіть тип
                                        поля</label>
                                </div>
                                <div className="form-group col-md-1">
                                    <label> Видалити </label>
                                </div>
                            </div>
                            {fields.map((attribute, index) => (
                                <div className="form-row" key={attribute.id}>
                                    <div className="form-group col-md-6">
                                        <Controller
                                            as={<input/>}
                                            className={"form-control"}
                                            name={`attributes[${index}].name`}
                                            control={control}
                                            defaultValue=""
                                            placeholder="name"
                                            required={true}
                                        />
                                    </div>
                                    {/*<div className="form-group col-md-4">*/}
                                    {/*    <Controller*/}
                                    {/*        as={<input/>}*/}
                                    {/*        className={"form-control"}*/}
                                    {/*        name={`attributes[${index}].filterName`}*/}
                                    {/*        control={control}*/}
                                    {/*        defaultValue=""*/}
                                    {/*        placeholder="name-filter"*/}
                                    {/*    />*/}
                                    {/*</div>*/}

                                    <div className="form-group col-md-5">
                                        <Controller
                                            as={Select}
                                            control={control}
                                            options={[
                                                {"value": "text", "label": "Текстовий"},
                                                {"value": "number", "label": "Числовий"},
                                            ]}
                                            name={`attributes[${index}].type`}
                                            isClearable
                                            controlShouldRenderValue={true}
                                            defaultValue={null}
                                            rules={{required: true}}
                                        />
                                    </div>

                                    <div className="form-group col-md-1">
                                        <button className="btn btn-danger" type="button"
                                                onClick={() => remove(index)}>-
                                        </button>
                                    </div>

                                </div>
                            ))}
                            <button className="btn btn-success center-block btn-lg "
                                    type="button"
                                    onClick={() => {
                                        append({filterName: null, name: null});
                                    }}>
                                Додати
                            </button>
                        </div>
                    </section>
                    <input type="submit" className={"btn btn-primary btn-lg"}
                           value={"Зберегти"}/>
                    {localStorage.getItem("auth-token") === null &&
                    <Link className={"btn btn-primary btn-lg"} to={"/login"}> Авторизація </Link>
                    }
                </form>
            </div>
        </>
    )
}