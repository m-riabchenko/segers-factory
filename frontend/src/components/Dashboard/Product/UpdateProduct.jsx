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

export const UpdateProduct = (props) => {
    const [product, setProduct] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const {register, handleSubmit, control, reset} = useForm();

    useEffect(() => {
        (async () => {
            const response = await productAPI.getProductDetail(props.match.params.productId)
            setProduct(response.data)
        })()
    }, [props.match.params.productId])


    const {value, loading, error} = useAsync(async () => {
        reset()
        if (product) {
            const response = await categoryAPI.getCategoryFilters(product.category);
            return response.data
        }
    }, [product])
    const onSelectCategory = e => {
        setSelectedCategory(e.currentTarget.value)
    }

    const onSubmit = async (data) => {
        let customAttr = {}
        for (let key in data.customAttr) {
            Object.assign(customAttr, {[key]: data.customAttr[key].value});
        }
        await productAPI.updateProduct(selectedCategory, data.baseAttr, customAttr, data.images, props.match.params.productId)
        reset()
    }

    if (product === null) return <RingLoader/>

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
                            <GeneralAttributes register={register()} name={product.name}
                                               price={product.price}
                                               description={product.description}/>
                            <Attributes register={register} value={value} product={product} control={control}/>
                            <ImageUpload control={control} productImages={product.images}/>
                        </div>

                        <div className="form-group col-md-3">
                            {/*<OrganizeProductPanel onSelectCategory={onSelectCategory}/>*/}
                            <VisibilityPanel/>
                        </div>
                    </div>
                    <input type="submit" className={"btn btn-primary btn-lg center-block"}/>
                </form>
            </div>
        </>
    )
}