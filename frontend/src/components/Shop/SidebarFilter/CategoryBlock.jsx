import React, {useState} from "react";

export const CategoryBlock = ({categories, setUniversalQueryString, setQueryString}) => {
    const [isChecked, setIsChecked] = useState({})

    const onHandleChangeCheckBox = (categoryId) => {
        if (categoryId === isChecked) {
            setIsChecked(null)
        } else {
            setIsChecked(categoryId)
            setUniversalQueryString(prev => ({...prev, category: categoryId}))
            // setQueryString({})
        }
    }

    return (
        <>
            <div className="htc__shop__cat">
                <h2 className="section-title-4">Категорії</h2>
                    <ul className="sidebar__list">
                        {
                            categories.map((category) => <li key={category.id}>
                                    <input type="checkbox"
                                           checked={isChecked === category.id}
                                           name={category.id}
                                           onChange={() => onHandleChangeCheckBox(category.id)}/> {category.name}
                                    <span> {category.quantity} </span>
                                </li>
                            )
                        }
                    </ul>
            </div>
        </>
    )
}
