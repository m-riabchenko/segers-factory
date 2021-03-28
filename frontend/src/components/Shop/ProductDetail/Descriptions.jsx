import React from "react";

export const Description = ({attributes, active}) => {
    return (
        <>
            <div role="tabpanel" id="description"
                 className="product__tab__content fade in active">
                <div className="product__description__wrap">
                    <div className="product__desc">
                        <h2 className="title__6">Details</h2>

                        {attributes && Object.entries(attributes)
                            .map(([key, value], index) =>
                                <div key={index}>{key} - {value}</div>
                            )}
                    </div>

                </div>
            </div>
        </>
    )
}