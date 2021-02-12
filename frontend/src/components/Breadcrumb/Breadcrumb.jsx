import React from "react";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Link} from "react-router-dom";

export const Breadcrumb = ({namePage}) => {
    const breadcrumbs = useBreadcrumbs();
    return (
        <div className="ht__bradcaump__area">
            <div className="ht__bradcaump__wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="bradcaump__inner text-center">
                                <h2 className="bradcaump-title">{namePage}</h2>
                                <nav className="bradcaump-inner">
                                    {breadcrumbs.map(({
                                                          match,
                                                          breadcrumb
                                                      }) =>
                                        <span key={match.url}><Link className="breadcrumb-item"
                                                                    to={match.url}>{breadcrumb}<span
                                            className="brd-separetor">/</span></Link></span>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}