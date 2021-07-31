import React, {useState} from "react";

export const CategoryBlock = ({categories,setUniversalQueryString, setQueryString}) => {
    const [isChecked, setIsChecked] = useState(null)
    const onHandleChangeCheckBox = (categoryId) => {
        if (categoryId === isChecked) {
            setIsChecked(null)
            setUniversalQueryString(prev => ({...prev, category: 0}))

        } else {
            setIsChecked(categoryId)
            setUniversalQueryString(prev => ({...prev, category: categoryId}))
            // setQueryString({})
        }
    }
    return (
        <>
            <div className="single__filter__category">
                <h2>Категорії</h2>
                <br/>
                <ul className="filter__list" key={"category.id"}>
                    {
                        categories.map((category) => <li key={category.id}>
                                <input type="checkbox"
                                       checked={isChecked === category.id}
                                       onChange={() => onHandleChangeCheckBox(category.id)}/><span> {category.name} </span> {category.quantity}
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    )
}
