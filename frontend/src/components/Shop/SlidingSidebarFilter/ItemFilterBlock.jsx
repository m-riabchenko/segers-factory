import React from "react";

export const ItemFilterBlock = ({filterName, filterValues, onHandleChangeCheckboxFilter}) => {
    return (
        <>
            <div className="single__filter">
                <h2>{filterName}</h2>
                <ul className="filter__list">
                    {filterValues.map((value, index) => <li key={index}>
                        <input type="checkbox" name={filterName}
                               onChange={onHandleChangeCheckboxFilter}
                               value={value.option_value_name}/><span> {value.option_value_name} ({value.products_quantity}) </span></li>
                    )}
                </ul>
            </div>
        </>
    )
}