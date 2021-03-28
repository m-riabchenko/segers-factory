import React from "react";
import {CategoryBlock} from "./CategoryBlock";
import {ItemFilterBlock} from "./ItemFilterBlock";

export const SlidingSidebarFilter = ({
                                         toggleFilter,
                                         onClickToggle,
                                         categories,
                                         setUniversalQueryString,
                                         onHandleChangeCheckboxFilter,
                                         options,
                                     }) => {
    return (
        <>
            <div onClick={onClickToggle}
                 className={toggleFilter ? "body__overlay is-visible" : "body__overlay"}></div>

            <div
                className={toggleFilter ? 'filter__wrap filter__menu__on' : 'filter__wrap'}>
                <div className="filter__cart">
                    <div className="filter__cart__inner">
                        <div className="filter__menu__close__btn">
                            <a className={"cursor-pointer"} onClick={onClickToggle}>
                                <i className="zmdi zmdi-close"></i></a>
                        </div>
                        <div className="filter__content">
                            <div className="fiter__content__inner">
                                <CategoryBlock categories={categories}
                                               setUniversalQueryString={setUniversalQueryString}
                                />
                                {options && options.map((option, index) =>
                                    <ItemFilterBlock
                                        key={index}
                                        filterName={option.option_name}
                                        filterValues={option.option_value}
                                        onHandleChangeCheckboxFilter={onHandleChangeCheckboxFilter}/>
                                )}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}