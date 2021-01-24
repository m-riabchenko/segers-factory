import React from "react";

export const Breadcrumb = () => {
    return (
        <div className="ht__bradcaump__wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="bradcaump__inner text-center">
                                <h2 className="bradcaump-title">Shop Page</h2>
                                <nav className="bradcaump-inner">
                                    <a className="breadcrumb-item" href="index.html">Home</a>
                                    <span className="brd-separetor">/</span>
                                    <span className="breadcrumb-item active">Shop Page</span>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}