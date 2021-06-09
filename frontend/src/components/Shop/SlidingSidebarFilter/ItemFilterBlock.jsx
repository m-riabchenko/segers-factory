import React from "react";

export const ItemFilterBlock = ({filterName, filterValues, onHandleChangeCheckboxFilter}) => {
    return (
        <>
            {filterName !== "category" ? <div className="single__filter">
                <h2>{filterName}</h2>
                <ul className="filter__list">
                    {filterValues.map((value, index) => <li key={index}>
                        <input type="checkbox" name={filterName}
                               defaultChecked={value.is_chosen}
                               onChange={onHandleChangeCheckboxFilter}
                               value={value.name}/><span> {value.name} ({value.quantity}) </span></li>
                    )}
                </ul>
            </div> : null}
        </>
    )
}