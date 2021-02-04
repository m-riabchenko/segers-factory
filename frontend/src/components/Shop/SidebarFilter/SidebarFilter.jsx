import React, {useState} from "react";
import {FilterBlock} from "./FilterBlock";
import Slider, {Range} from "rc-slider";
import "rc-slider/assets/index.css";
import {CategoryBlock} from "./CategoryBlock";


export const SidebarFilter = ({setUniversalQueryString, categories, setFilterCategory, filters, onHandleChangeCheckboxFilter}) => {
    const [sliderValue, setSliderValue] = useState([0, 500])

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
    return (
        <>
            <div className="htc__shop__left__sidebar hidden-xs hidden-sm">
                <div className="htc-grid-range">
                    <h4 className="section-title-4">FILTER BY PRICE</h4>
                    <div className="content-shopby">
                        <div className="price_filter s-filter clear">
                            <Range min={0} max={5000} value={sliderValue} count={1}
                                   allowCross={false}
                                   onChange={onHandleChange}/>

                            <div className="slider__range--output">
                                <div className="price__output--wrap">
                                    <div className="price--output">
                                        <span>Price : ${sliderValue[0]} - ${sliderValue[1]}</span>
                                    </div>
                                    <div className="price--filter">
                                        <a onClick={onClickSetPriceFilter}>Filter</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CategoryBlock categories={categories}
                             setFilterCategory={setFilterCategory}
                             setUniversalQueryString={setUniversalQueryString}/>

                {Object.keys(filters).map((keyName, index) =>
                    <FilterBlock
                        key={index}
                        filterName={keyName}
                        filterValues={filters[keyName]}
                        onHandleChangeCheckboxFilter={onHandleChangeCheckboxFilter}/>
                )}

            </div>

        </>
    )
}