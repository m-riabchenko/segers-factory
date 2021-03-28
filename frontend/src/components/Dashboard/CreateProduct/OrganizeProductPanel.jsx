import React, {useEffect, useState} from "react";
import {categoryAPI} from "../../../api/CategoryAPI";

export const OrganizeProductPanel = ({onSelectCategory}) => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        (async () => {
            const categoryList = await categoryAPI.getCategories();
            setCategories(categoryList)
        })()
    }, [])

    return (
        <section className="panel panel-default">
            <div className={"text_header"}>Organize Product</div>
            <hr/>
            <div className="panel-body">
                <select onChange={onSelectCategory}
                        className="form-control input-lg mb--10">
                    {categories.map(category => (
                        <option value={category.id}
                                key={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
        </section>
    )
}