import React from "react";

export const VisibilityPanel = () => {
    return (
        <section className="panel panel-default">
            <div className={"text_header"}>Visibility</div>
            <hr/>
            <div className="panel-body">
                <div className="form-check">
                    <input className="form-check-input big_radio" type="radio"
                           name="exampleRadios" id="exampleRadios1"
                           value="option1" checked/>
                    <label className="text_radio"
                           htmlFor="exampleRadios1">
                        Published

                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input big_radio" type="radio"
                           name="exampleRadios" id="exampleRadios2"
                           value="option2"/>
                    <label className="text_radio"
                           htmlFor="exampleRadios2">
                        Not Published
                    </label>
                </div>
                <hr/>
                <div className="form-check">
                    <input className="form-check-input big_radio" type="radio"
                           name="exampleRadios_" id="exampleRadios3"
                           value="option1" checked/>
                    <label className="text_radio"
                           htmlFor="exampleRadios3">
                        Available for filter
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input big_radio" type="radio"
                           name="exampleRadios_" id="exampleRadios4"
                           value="option2"/>
                    <label className="text_radio"
                           htmlFor="exampleRadios4">
                        Unavailable for filter
                    </label>
                </div>
            </div>
        </section>
    )
}