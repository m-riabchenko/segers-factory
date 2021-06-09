import React, {useState} from "react";

export const CategoryBlock = ({categories,setUniversalQueryString, setQueryString}) => {
    const [isChecked, setIsChecked] = useState(null)
    const onHandleChange = async (categoryId) => {
        setIsChecked(categoryId)
        setUniversalQueryString(prev => ({...prev, category: categoryId}))
        // setQueryString({})
    }
    return (
        <>
            <div className="single__filter__category">
                <h2>Categories</h2>
                <br/>
                <ul className="filter__list" key={"category.id"}>
                    {
                        categories.map((category) => <li key={category.id}>
                                <input type="checkbox"
                                       checked={isChecked === category.id}
                                       onChange={() => onHandleChange(category.id)}/><span> {category.name} </span> {category.quantity}
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    )
}
