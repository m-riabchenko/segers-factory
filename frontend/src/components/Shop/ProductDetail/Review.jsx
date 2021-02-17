import React, {useEffect, useState} from "react";
import {reviewAPI} from "../../../api/ReviewAPI";
import {productAPI} from "../../../api/ProductAPI";
import {useForm} from "react-hook-form";
import review_img from "../../../resources/images/review/1.jpg"
export const Review = ({productId, active}) => {
    const [reviews, setReviews] = useState(null)
    const {register, handleSubmit} = useForm()

    useEffect(() => {
        (async () => {
            const response = await productAPI.getReviewProduct(productId);
            setReviews(response.data)
            return response.data
        })()
    }, [])
    console.log(reviews)
    const onSubmit = data => {
        return reviewAPI.createReview(productId, data.text)
    }

    return (
        <>
            <div role="tabpanel" id="reviews"
                 className="product__tab__content fade in active">
                {reviews && reviews.map(review =>
                    <div className="review__address__inner">

                        <div className="pro__review">
                            <div className="review__thumb">
                                <img src={review_img} alt="review images"/>
                            </div>
                            <div className="review__details">
                                <div className="review__info">
                                    <h4><a href="/#">{review.user}</a></h4>
                                    <ul className="rating">
                                        <li><i className="zmdi zmdi-star"></i></li>
                                        <li><i className="zmdi zmdi-star"></i></li>
                                        <li><i className="zmdi zmdi-star"></i></li>
                                        <li><i className="zmdi zmdi-star-half"></i>
                                        </li>
                                        <li><i className="zmdi zmdi-star-half"></i>
                                        </li>
                                    </ul>
                                    <div className="rating__send ">
                                        <a href="/#"><i
                                            className="zmdi zmdi-mail-reply"></i></a>
                                        <a href="/#"><i
                                            className="zmdi zmdi-close"></i></a>
                                    </div>
                                </div>
                                <div className="review__date ">
                                    <span>27 Jun, 2016 at 2:30pm</span>
                                </div>
                                <p>{review.text}</p>
                            </div>
                        </div>
                        {review.children.map(answer =>
                            <div className="pro__review ans">
                                <div className="review__thumb">
                                    <img src={review_img} alt="review images"/>
                                </div>
                                <div className="review__details">
                                    <div className="review__info">
                                        <h4><a href="/#">{answer.user}</a></h4>
                                        <ul className="rating">
                                            <li><i className="zmdi zmdi-star"></i></li>
                                            <li><i className="zmdi zmdi-star"></i></li>
                                            <li><i className="zmdi zmdi-star"></i></li>
                                            <li><i className="zmdi zmdi-star-half"></i>
                                            </li>
                                            <li><i className="zmdi zmdi-star-half"></i>
                                            </li>
                                        </ul>
                                        <div className="rating__send">
                                            <a href="/#"><i
                                                className="zmdi zmdi-mail-reply"></i></a>
                                            <a href="/#"><i
                                                className="zmdi zmdi-close"></i></a>
                                        </div>
                                    </div>
                                    <div className="review__date">
                                        <span>27 Jun, 2016 at 2:30pm</span>
                                    </div>
                                    <p>{answer.text}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className="rating__wrap">
                    <h2 className="rating-title">Write A review</h2>
                    <h4 className="rating-title-2">Your Rating</h4>
                    <div className="rating__list">
                        <ul className="rating">
                            <li><i className="zmdi zmdi-star-half"></i></li>
                        </ul>
                        <ul className="rating">
                            <li><i className="zmdi zmdi-star-half"></i></li>
                            <li><i className="zmdi zmdi-star-half"></i></li>
                        </ul>
                        <ul className="rating">
                            <li><i className="zmdi zmdi-star-half"></i></li>
                            <li><i className="zmdi zmdi-star-half"></i></li>
                            <li><i className="zmdi zmdi-star-half"></i></li>
                        </ul>
                        <ul className="rating">
                            <li><i className="zmdi zmdi-star-half"></i></li>
                            <li><i className="zmdi zmdi-star-half"></i></li>
                            <li><i className="zmdi zmdi-star-half"></i></li>
                            <li><i className="zmdi zmdi-star-half"></i></li>
                        </ul>
                        <ul className="rating">
                            <li><i className="zmdi zmdi-star-half"></i></li>
                            <li><i className="zmdi zmdi-star-half"></i></li>
                            <li><i className="zmdi zmdi-star-half"></i></li>
                            <li><i className="zmdi zmdi-star-half"></i></li>
                            <li><i className="zmdi zmdi-star-half"></i></li>
                        </ul>
                    </div>
                </div>
                <div className="review__box">
                    <form id="review-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="single-review-form">
                            <div className="review-box message">
                                <textarea ref={register} name={"text"}
                                          placeholder="Write your review"/>
                            </div>
                        </div>
                        <div className="review-btn">
                            <button className="fv-btn">submit review</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}