import React from "react";

export const GeneralAttributes = ({register, name, price, description}) => {
    return (
        <section className="panel panel-default">
            <div className={"text_header"}>General Information</div>
            <hr/>
            <div className="panel-body">
                <div className="form-group">
                    <div className={"col-md-8"}>
                        <input type="text"
                               className="form-control input-lg"
                               ref={register}
                               name={"baseAttr.name"}
                               defaultValue={name}
                               placeholder="Name"/>
                    </div>
                    <div className={"col-md-4"}>
                        <input type="number"
                               className="form-control input-lg"
                               ref={register}
                               name={"baseAttr.price"}
                               defaultValue={price}
                               placeholder="Price"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className={"col-md-12 mtb--20"}>
                        <textarea className="form-control input-lg"
                                  ref={register}
                                  defaultValue={description}
                                  name="baseAttr.descriptions"
                                  placeholder="Descriptions"/>
                    </div>
                </div>


            </div>
        </section>
    )
}