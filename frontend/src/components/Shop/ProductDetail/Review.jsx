import React, {useEffect, useState} from "react";
import {reviewAPI} from "../../../api/ReviewAPI";
import {productAPI} from "../../../api/ProductAPI";
import {Controller, useForm} from "react-hook-form";
import review_img from "../../../resources/images/review/1.jpg"
import ReactStars from "react-rating-stars-component/dist/react-stars";

export const Review = ({productId, active}) => {
    const [reviews, setReviews] = useState(null)
    const [reply, setReply] = useState(null)
    const {register, handleSubmit, reset, control} = useForm()

    useEffect(() => {
        (async () => getReviews())()
    }, [])

    const getReviews = async () => {
        return await productAPI.getReviewProduct(productId)
            .then(response => response.status === 200 ? setReviews(response.data) : null
            );
    }

    const onSubmitReview = data => {
        return reviewAPI.createReview({product: productId, text: data.text, rating: data.rating})
            .then(response => {
                if (response.status === 201) {
                    getReviews()
                    reset(null)
                }
            })
    }

    const onSubmitReply = data => {
        if (reply) {
            return reviewAPI.createReview({product: productId, text: data.textReply, parent: reply})
                .then(response => {
                    if (response.status === 201) {
                        getReviews()
                        reset(null)
                        setReply(null)
                    }
                })
        }
    }

    const toggleReply = (replyId) => {
        if (reply === replyId) {
            setReply(null)
        } else {
            setReply(replyId)
        }
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
                                    <h4><a href="/#">{review.user.email}</a></h4>
                                    <ul className="rating">
                                        <ReactStars
                                            count={5}
                                            size={28}
                                            value={review.rating}
                                            isHalf={true}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    </ul>
                                    <div className="rating__send ">
                                        <i className="zmdi zmdi-mail-reply cursor-pointer"
                                           onClick={() => toggleReply(review.id)}></i>
                                        <i className="zmdi zmdi-close cursor-pointer"
                                           onClick={() => toggleReply(null)}></i>
                                    </div>
                                </div>
                                <div className="review__date ">
                                    <span>27 Jun, 2016 at 2:30pm</span>
                                </div>
                                <p>{review.text}</p>
                                <div className="review-box message">
                                    {reply !== review.id ? null :
                                        <form onSubmit={handleSubmit(onSubmitReply)}>
                                            <br/><br/>
                                            <textarea ref={register} name={"textReply"}
                                                      placeholder="Write your review"/>
                                            <div className="review-btn">
                                                <button className="fv-btn">reply</button>
                                            </div>
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>
                        {review.children.map(answer =>
                            <div className="pro__review ans">
                                <div className="review__thumb">
                                    <img src={review_img} alt="review images"/>
                                </div>
                                <div className="review__details">
                                    <div className="review__info">
                                        <h4><a href="/#">{review.user.email}</a></h4>
                                        <ul className="rating">
                                            <> </>
                                        </ul>
                                    </div>
                                    <div className="review__date">
                                        <span>27 Jun, 2016 at 2:30pm</span>
                                    </div>
                                    <p>{answer.text}</p>
                                </div>
                            </div>
                        )}
                        <br/>
                    </div>
                )}
                <div className="rating__wrap">
                    <h2 className="rating-title">Write A review</h2>
                    <h4 className="rating-title-2">Your Rating</h4>
                    <div className="rating__list">
                        <Controller
                            as={ReactStars}
                            name={"rating"}
                            control={control}
                            count={5}
                            size={40}
                            activeColor="#ffd700"
                        />
                    </div>
                </div>
                <div className="review__box">
                    <form id="review-form" onSubmit={handleSubmit(onSubmitReview)}>
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