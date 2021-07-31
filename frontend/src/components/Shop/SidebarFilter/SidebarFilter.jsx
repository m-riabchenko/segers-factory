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
            <div className="htc__shop__left__sidebar hidden-xs hidden-sm">
                <div className="htc-grid-range">
                    <div className="search__inner">
                        <form className="input-group mb--20">
                            <input type="search" className="form-control" value={search}
                                   onChange={(e) => setSearch(e.currentTarget.value)}
                                   onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-' || evt.key === 'Enter')}
                            />
                            <span className="input-group-btn">
                            <button className="btn search-btn" type="button"
                                    onClick={onClickSearch}>
                                <span className="glyphicon glyphicon-search"
                                      aria-hidden="true"> </span>
                            </button>
                            </span>
                        </form>
                    </div>
                    <h4 className="section-title-4">Фільтр за ціною</h4>
                    <div className="content-shopby">
                        <div className="price_filter s-filter clear">
                            <Range min={rangePrice && rangePrice.min}
                                   max={rangePrice && rangePrice.max} value={sliderValue} count={1}
                                   allowCross={false}
                                   onChange={onHandleChange}/>

                            <div className="slider__range--output">
                                <div className="price__output--wrap">
                                    <div className="price--output">
                                        <span>Ціна : {sliderValue[0]} - {sliderValue[1]} грн.</span>
                                    </div>
                                    <div className="price--filter">
                                        <a className={"cursor-pointer"}
                                           onClick={onClickSetPriceFilter}>Фільтрувати</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CategoryBlock categories={categories}
                               setUniversalQueryString={setUniversalQueryString}
                               setQueryString={setQueryString}/>


                {options && options.map((option, index) =>
                    <ItemFilterBlock
                        key={index}
                        filterName={option.name}
                        filterValues={option.value}
                        onHandleChangeCheckboxFilter={onHandleChangeCheckboxFilter}/>
                )}

            </div>

        </>
    )
}