import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import React, {useEffect, useState} from "react";
import {categoryAPI} from "../../api/CategoryAPI";
import {useAsync} from "react-use";
import {RingLoader} from "react-spinners";
import {useForm} from "react-hook-form";
import {productAPI} from "../../api/ProductAPI";

export const AddProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categories, setCategories] = useState([])

    const {register, handleSubmit} = useForm();

    const {value, loading, error} = useAsync(async () => {
        if (selectedCategory) {
            const response = await categoryAPI.getCategory(selectedCategory);
            return response.data
        }
    }, [selectedCategory])

    useEffect(() => {
        (async () => {
            const categoryList = await categoryAPI.getCategories();
            setCategories(categoryList)
        })()
    }, [])

    const onSelectCategory = e => {
        setSelectedCategory(e.currentTarget.value)
    }

    const onSubmit = (data) => {
        console.log(data)
        productAPI.createProduct(selectedCategory, data.baseAttr, data.customAttr)
            .then(() => console.log("Success"))
    }

    return (
        <>
            <Breadcrumb namePage={"Dashboard"}/>
            <div className={"container"}>
                {loading ? <RingLoader/> : null}
                <select onChange={onSelectCategory} className="form-control">
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Product name</label>
                            <input type="text" className="form-control"
                                   ref={register}
                                   name={"baseAttr.name"}
                                   placeholder="product name"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Product price</label>
                            <input type="text" className="form-control"
                                   ref={register}
                                   name={"baseAttr.price"}
                                   placeholder="product price"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Product text</label>
                            <input type="text" className="form-control"
                                   ref={register}
                                   name="baseAttr.descriptions"
                                   placeholder="product descriptions"/>
                        </div>

                        {value && value.schema_attributes.map((attr, index) => (
                            <div className="form-row" key={index}>
                                <div className="form-group col-md-4">
                                    <label>{attr.name}</label>
                                    <input ref={register} name={`customAttr.${attr.name}`}
                                           type={attr.type} className="form-control"/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <input type="submit" className={"btn btn-primary btn-lg center-block"}/>
                </form>
            </div>
        </>
    )
}