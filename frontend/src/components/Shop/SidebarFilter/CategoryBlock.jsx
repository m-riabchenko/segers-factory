import React, {useState} from "react";

export const CategoryBlock = ({categories, setFilterCategory, setUniversalQueryString}) => {
    const [isChecked, setIsChecked] = useState(null)
    const onHandleChange = async (categoryId) => {
        setIsChecked(categoryId)
        setUniversalQueryString(prev => ({...prev, categories: categoryId}))
        setFilterCategory(categoryId)
    }
    return (
        <>
            <div className="htc__shop__cat">
                <h4 className="section-title-4">Categories</h4>

                <ul className="sidebar__list">
                    {
                        categories.map((category) => <li key={category.id}>
                                <input type="checkbox"
                                       checked={isChecked === category.id}
                                       onChange={() => onHandleChange(category.id)}/> {category.name}
                                <span> 3 </span>
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    )
}
