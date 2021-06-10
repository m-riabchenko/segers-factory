import {Breadcrumb} from "../../Breadcrumb/Breadcrumb";
import React, {useEffect, useState} from "react";
import {categoryAPI} from "../../../api/CategoryAPI";
import {useAsync} from "react-use";
import {RingLoader} from "react-spinners";
import {useForm} from "react-hook-form";
import {productAPI} from "../../../api/ProductAPI";
import {VisibilityPanel} from "./VisibilityPanel";
import {GeneralAttributes} from "./GeneralAttributes";
import {Attributes} from "./Attributes";
import {OrganizeProductPanel} from "./OrganizeProductPanel";
import {ImageUpload} from "./ImageUpload";
import {useHistory} from "react-router";

export const AddProduct = (props) => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const {register, handleSubmit, control, reset} = useForm();
    let history = useHistory();

    const {value, loading, error} = useAsync(async () => {
        reset()
        if (selectedCategory) {
            const response = await categoryAPI.getCategoryFilters(selectedCategory);
            return response.data
        }
    }, [selectedCategory])

    const onSelectCategory = item => {
        if (item) {
            setSelectedCategory(item.value)
        } else {
            setSelectedCategory(null)
        }
    }
    const onSubmit = async (data) => {
        console.log(data)
        let customAttr = {}
        for (let key in data.customAttr) {
            Object.assign(customAttr, {[key]: data.customAttr[key].value});
        }
        let response = await productAPI.createProduct(selectedCategory, data.baseAttr, customAttr, data.images)
        if (response.statusCode === 401) {
            history.push("/login")
        }
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
                            <ImageUpload control={control}/>
                            <Attributes register={register} value={value} control={control}/>
                        </div>

                        <div className="form-group col-md-3">
                            <OrganizeProductPanel onSelectCategory={onSelectCategory}/>
                            <VisibilityPanel register={register}/>
                        </div>
                    </div>
                    <input type="submit" className={"btn btn-primary btn-lg center-block"}/>
                </form>
            </div>
        </>
    )
}