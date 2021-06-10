import React from "react";

export const GeneralAttributes = ({register, name, price, description}) => {
    return (
        <section className="panel panel-default">
            <div className={"text_header"}>Основна інформація</div>
            <hr/>
            <div className="panel-body">
                <div className="form-group">
                    <div className={"col-md-8"}>
                        <input type="text"
                               className="form-control input-lg"
                               ref={register({required: true})}
                               name={"baseAttr.name"}
                               defaultValue={name ? name : null}
                               placeholder="Name"/>
                    </div>
                    <div className={"col-md-4"}>
                        <input type="number"
                               min={1}
                               onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-' || evt.key === 'Enter') && evt.preventDefault()}
                               className="form-control input-lg"
                               ref={register({required: true})}
                               name={"baseAttr.price"}
                               defaultValue={price ? price : null}
                               placeholder="Price"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className={"col-md-12 mtb--20"}>
                        <textarea className="form-control input-lg"
                                  ref={register}
                                  defaultValue={description ? description : null}
                                  name="baseAttr.descriptions"
                                  placeholder="Descriptions"/>
                    </div>
                </div>


            </div>
        </section>
    )
}