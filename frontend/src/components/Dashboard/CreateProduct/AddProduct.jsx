import {Breadcrumb} from "../../Breadcrumb/Breadcrumb";
import React, {useState} from "react";
import {categoryAPI} from "../../../api/CategoryAPI";
import {useAsync} from "react-use";
import {RingLoader} from "react-spinners";
import {useForm, Controller} from "react-hook-form";
import {productAPI} from "../../../api/ProductAPI";
import Select from 'react-select';
import {VisibilityPanel} from "./VisibilityPanel";
import {GeneralAttributes} from "./GeneralAttributes";
import {Attributes} from "./Attributes";
import {OrganizeProductPanel} from "./OrganizeProductPanel";

export const AddProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const {register, handleSubmit, control, reset} = useForm();

    const {value, loading, error} = useAsync(async () => {
        reset()
        if (selectedCategory) {
            const response = await categoryAPI.getCategoryFilters(selectedCategory);
            return response.data
        }
    }, [selectedCategory])

    const onSelectCategory = e => {
        setSelectedCategory(e.currentTarget.value)
    }

    const onSubmit = (data) => {
        let customAttr = {}
        for (let key in data.customAttr){
            Object.assign(customAttr, {[key]: data.customAttr[key].value});
        }
        productAPI.createProduct(selectedCategory, data.baseAttr, customAttr)
            .then(() => console.log("Success"))
        reset()
    }


    return (
        <>
            <Breadcrumb namePage={"Dashboard"}/>
            <br/>
            <br/>
            <br/>
            <div className={'container-fluid'}>
                {loading ? <RingLoader/> : null}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col-md-2">

                        </div>
                        <div className="form-group col-md-6">
                            <GeneralAttributes register={register()}/>
                            <Attributes register={register} value={value} control={control}/>
                        </div>

                        <div className="form-group col-md-3">
                            <OrganizeProductPanel onSelectCategory={onSelectCategory}/>
                            <VisibilityPanel/>
                        </div>
                    </div>
                    <input type="submit" className={"btn btn-primary btn-lg center-block"}/>
                </form>
            </div>
        </>
    )
}