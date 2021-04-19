import React, {useState} from "react";
import {Range} from "rc-slider";
import "rc-slider/assets/index.css";
import {CategoryBlock} from "./CategoryBlock";
import {ItemFilterBlock} from "../SlidingSidebarFilter/ItemFilterBlock";


export const SidebarFilter = ({
                                  setUniversalQueryString,
                                  categories,
                                  onHandleChangeCheckboxFilter,
                                  options,
                                  productFilter
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
        productFilter("name="+search)
    }

    console.log(search)
    return (
        <>
            <div className="htc__shop__left__sidebar hidden-xs hidden-sm">
                <div className="htc-grid-range">
                    <div className="search__inner">
                        <form className="input-group mb--20">
                            <input type="search" className="form-control" value={search}
                                   onChange={(e) => setSearch(e.currentTarget.value)}/>
                            <span className="input-group-btn">
                            <button className="btn search-btn" type="button" onClick={onClickSearch}>
                                <span className="glyphicon glyphicon-search"
                                      aria-hidden="true"> </span>
                            </button>
                            </span>
                        </form>
                    </div>
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
                                        <a className={"cursor-pointer"} onClick={onClickSetPriceFilter}>Filter</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CategoryBlock categories={categories}
                               setUniversalQueryString={setUniversalQueryString}/>


                {options && options.map((option, index) =>
                    <ItemFilterBlock
                        key={index}
                        filterName={option.option_name}
                        filterValues={option.option_value}
                        onHandleChangeCheckboxFilter={onHandleChangeCheckboxFilter}/>
                )}

            </div>

        </>
    )
}