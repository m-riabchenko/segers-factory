import React from "react";

export const FilterBlock = ({filterName, filterValues, onHandleChangeCheckboxFilter}) => {
    return (
        <>
            <div className="htc__shop__cat">
                    <h4 className="section-title-4">{filterName}</h4>
                    <ul className="sidebar__list">
                        {filterValues.map((value, index) => <li key={index}>
                        <input type="checkbox" name={filterName}
                               onChange={onHandleChangeCheckboxFilter}
                               value={value}/><a href="/#"> {value} <span>3</span></a></li>
                    )}
                    </ul>
                </div>
        </>
    )
    // <div className="htc__shop__cat">
    //                 <h4 className="section-title-4">CHOOSE COLOUR</h4>
    //                 <ul className="sidebar__list">
    //                     <li className="black"><a href="/#"><i
    //                         className="zmdi zmdi-circle"></i>Black<span>3</span></a>
    //                     </li>
    //                     <li className="blue"><a href="/#"><i
    //                         className="zmdi zmdi-circle"></i>Blue <span>4</span></a>
    //                     </li>
    //                     <li className="brown"><a href="/#"><i
    //                         className="zmdi zmdi-circle"></i>Brown <span>3</span></a>
    //                     </li>
    //                     <li className="red"><a href="/#"><i
    //                         className="zmdi zmdi-circle"></i>Red <span>6</span></a>
    //                     </li>
    //                     <li className="orange"><a href="/#"><i
    //                         className="zmdi zmdi-circle"></i>Orange <span>10</span></a>
    //                     </li>
    //                 </ul>
    //             </div>
}