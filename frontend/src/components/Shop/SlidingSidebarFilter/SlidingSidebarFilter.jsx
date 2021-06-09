import React, {useState} from "react";
import {CategoryBlock} from "./CategoryBlock";
import {ItemFilterBlock} from "./ItemFilterBlock";
import {Range} from "rc-slider";

export const SlidingSidebarFilter = ({
                                         toggleFilter,
                                         onClickToggle,
                                         setUniversalQueryString,
                                         categories,
                                         onHandleChangeCheckboxFilter,
                                         options,
                                         productFilter,
                                         rangePrice,
                                         setQueryString
                                     }) => {

    const [sliderValue, setSliderValue] = useState([0, 500])
    const [search, setSearch] = useState("")
    const onHandleChange = value => {
        setSliderValue(value)
    }
    const onClickSetPriceFilter = () => {
        setUniversalQueryString(prev => ({
            ...prev,
            min_price: sliderValue[0],
            max_price: sliderValue[1],
        }))
    }
    const onClickSearch = () => {
        productFilter("search=" + search)
    }

    return (
        <>
            <div onClick={onClickToggle}
                 className={toggleFilter ? "body__overlay is-visible" : "body__overlay"}></div>

            <div
                className={toggleFilter ? 'filter__wrap filter__menu__on' : 'filter__wrap'}>
                <div className="filter__cart">
                    <div className="filter__cart__inner">
                        <div className="htc-grid-range">
                            <div className="search__inner">
                                <form className="input-group mb--20">
                                    <input type="search" className="form-control" value={search}
                                           onChange={(e) => setSearch(e.currentTarget.value)}/>
                                    <span className="input-group-btn">
                            <button className="btn search-btn" type="button"
                                    onClick={onClickSearch}>
                                <span className="glyphicon glyphicon-search"
                                      aria-hidden="true"> </span>
                            </button>
                            </span>
                                </form>
                            </div>
                            <h4 className="section-title-4">FILTER BY PRICE</h4>
                            <div className="content-shopby">
                                <div className="price_filter s-filter clear">
                                    <Range min={rangePrice && rangePrice.min}
                                           max={rangePrice && rangePrice.max} value={sliderValue}
                                           count={1}
                                           allowCross={false}
                                           onChange={onHandleChange}/>

                                    <div className="slider__range--output">
                                        <div className="price__output--wrap">
                                            <div className="price--output">
                                                <span>Price : {sliderValue[0]} - {sliderValue[1]} грн.</span>
                                            </div>
                                            <div className="price--filter">
                                                <a className={"cursor-pointer"}
                                                   onClick={onClickSetPriceFilter}>Filter</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filter__menu__close__btn">
                            <div className={"cursor-pointer"} onClick={onClickToggle}>
                                <i className="zmdi zmdi-close"></i></div>
                        </div>
                        <div className="filter__content">
                            <div className="fiter__content__inner">
                                <CategoryBlock categories={categories}
                                               setUniversalQueryString={setUniversalQueryString}
                                               setQueryString={setQueryString}
                                />
                                {options && options.map((option, index) =>
                                    <ItemFilterBlock
                                        key={index}
                                        filterName={option.name}
                                        filterValues={option.value}
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