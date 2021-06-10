import React from "react";

export const VisibilityPanel = ({register}) => {
    return (
        <section className="panel panel-default">
            <div className={"text_header"}>Доступність</div>
            <hr/>
            <div className="panel-body">
                <div className="form-check">
                    <input className="form-check-input big-checkbox" type="checkbox"
                           name="available" id="checkbox" ref={register}
                           defaultChecked={true}/>
                    <label className="text_radio"
                           htmlFor="checkbox">
                        Відображати в пошуку
                    </label>
                </div>
            </div>
        </section>
    )
}