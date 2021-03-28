import React from "react";
import Create, {makeCreatableSelect} from 'react-select/creatable';
import {Controller} from "react-hook-form";

export const Attributes = ({register, value, control}) => {
    const getArrayFromObject = (object) => {
        let arr = [];
        for (let key in object) {
            let options_arr = []
            for (let i in object[key]) {
                options_arr.push(
                    {
                        value: object[key][i],
                        label: object[key][i]
                    })
            }
            arr.push(
                {
                    name: key,
                    options: options_arr
                });
        }
        return arr
    }

    return (
        <section className="panel panel-default">
            <div className={"text_header"}>Attributes</div>
            <hr/>
            <div className="panel-body">
                {value && getArrayFromObject(value['filters']).map((attr, index) => (
                    <div className="form-group" key={index}>
                        <div className="col-md-6 mtb--10">
                            <div className={'text_attr'}>{attr.name}</div>
                        </div>
                        <div className="col-md-6 mtb--10">
                            {/*<input ref={register}*/}
                            {/*       name={`customAttr.${attr.name}`}*/}
                            {/*       type={attr.type}*/}
                            {/*       className="form-control input-lg"/>*/}
                            <Controller
                                as={Create}
                                options={attr["options"]}
                                className="col-md-12 mtb--10"
                                name={"customAttr." + attr.name}
                                isClearable
                                control={control}
                                controlShouldRenderValue={true}
                                defaultValue={"none"}
                                // onInputChange={(e) => console.log(e)}
                            />
                        </div>


                    </div>
                ))}
            </div>
        </section>
    )
}