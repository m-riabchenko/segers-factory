import React, {useState} from "react";
import {useFieldArray, Controller, useForm} from "react-hook-form";
import {categoryAPI} from "../../api/CategoryAPI";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import {useAsync} from "react-use";

export const AddCategory = () => {
    const {register, control, handleSubmit} = useForm()

    const {fields, append, remove} = useFieldArray({
        control,
        name: "attributes",
    })

    const onSubmit = async data => {
        console.log(data)
        return await categoryAPI.createCategory(data.category, data.attributes, data.parent)
    }

    const {value, loading, error} = useAsync(async () => {
        return await categoryAPI.getCategories();
    }, [])

    return (
        <>
            <Breadcrumb namePage={"Dashboard"}/>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Input category name</label>
                            <input type="text" className="form-control" ref={register}
                                   name="category"
                                   placeholder="Enter category name"/>
                            {/*<small className="form-text text-muted">\.</small>*/}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlSelect1">Select category parent or
                                skip</label>
                            <select className="form-control" ref={register} name="parent">
                                {value && value.map((category, index) => (
                                    <option value={category.id} key={index}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputPassword4">Attribute Name</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">Attribute Name for filter</label>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="exampleFormControlSelect1">Select field type</label>
                        </div>
                        <div className="form-group col-md-1">
                            <label> Remove </label>
                        </div>
                    </div>
                    {fields.map((attribute, index) => (
                        <div className="form-row" key={attribute.id}>
                            <div className="form-group col-md-4">
                                <Controller
                                    as={<input/>}
                                    className={"form-control"}
                                    name={`attributes[${index}].name`}
                                    control={control}
                                    defaultValue=""
                                    placeholder="name"
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <Controller
                                    as={<input/>}
                                    className={"form-control"}
                                    name={`attributes[${index}].filterName`}
                                    control={control}
                                    defaultValue=""
                                    placeholder="name-filter"
                                />
                            </div>

                            <div className="form-group col-md-3">
                                <select ref={register} name={`attributes[${index}].type`}
                                        className="form-control">
                                    <option value={"text"}>string</option>
                                    <option value={"number"}>int</option>
                                    <option value={"checkbox"}>boolean</option>
                                </select>
                            </div>

                            <div className="form-group col-md-1">
                                <button className="btn btn-danger" type="button"
                                        onClick={() => remove(index)}>Delete
                                </button>
                            </div>

                        </div>
                    ))}
                    <div className={"form-inline"}>
                        <div className={"col-md-6"}>
                            <button className="btn btn-success center-block btn-lg mb--40"
                                    type="button"
                                    onClick={() => {
                                        append({filterName: null, name: null});
                                    }}>
                                Add attribute
                            </button>
                        </div>
                        <div className={"col-md-6"}>
                            <input type="submit" className={"btn btn-primary center-block btn-lg"}/>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}