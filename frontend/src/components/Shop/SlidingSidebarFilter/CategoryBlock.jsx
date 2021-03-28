import React, {useState} from "react";

export const CategoryBlock = ({categories,setUniversalQueryString}) => {
    const [isChecked, setIsChecked] = useState(null)
    const onHandleChange = async (categoryId) => {
        setIsChecked(categoryId)
        setUniversalQueryString(prev => ({...prev, category: categoryId}))
    }
    return (
        <>
            <div className="single__filter__category">
                <h2>Categories</h2>
                <ul className="filter__list" key={"category.id"}>
                    {
                        categories.map((category) => <li key={category.id}>
                                <input type="checkbox"
                                       checked={isChecked === category.id}
                                       onChange={() => onHandleChange(category.id)}/><span> {category.name} </span>
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    )
}
