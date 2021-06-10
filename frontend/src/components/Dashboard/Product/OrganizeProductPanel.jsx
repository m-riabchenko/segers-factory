import React, {useEffect, useState} from "react";
import {categoryAPI} from "../../../api/CategoryAPI";
import Select from "react-select/";

export const OrganizeProductPanel = ({onSelectCategory}) => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        (async () => {
            const categoryList = await categoryAPI.getCategories();
            setCategories(categoryList.map(category => {
                return {"value": category.id, "label": category.name}
            }))
        })()
    }, [])

    return (
        <section className="panel panel-default">
            <div className={"text_header"}>Виберіть категорію</div>
            <hr/>
            <div className="panel-body">
                <Select
                    options={categories}
                    className="col-md-12 mtb--10"
                    name={"category"}
                    isClearable
                    controlShouldRenderValue={true}
                    defaultValue={"none"}
                    onChange={(value) => onSelectCategory(value)}
                />
            </div>
        </section>
    )
}