import ImageUploading from 'react-images-uploading';
import React, {useEffect, useState} from "react";
import {Controller} from "react-hook-form";

export const ImageUpload = ({control, productImages}) => {
    const [images, setImages] = useState(null);
    const [currentNumImg, setCurrentNumImg] = useState(0)
    const maxNumberImg = 4;
    const HOST = "http://127.0.0.1:8000"

    useEffect(() => {
        if (productImages) {
            let newImgArr = []
            Object.entries(productImages).map(([key, value]) => {
                newImgArr.push({"data_url": HOST + value, "old_image": key})
            })
            setImages(newImgArr);
            setCurrentNumImg(newImgArr.length)
        }
    }, [productImages])


    const onSelectImg = (imageList) => {
        console.log(imageList)
        setImages(imageList);
        setCurrentNumImg(imageList.length)
    };

    return (
        <section className="panel panel-default">
            <div className={"text_header pull-left"}>Upload images</div>
            <div className={"text_header-right"}>Max images - {currentNumImg}/{maxNumberImg}</div>

            <hr/>
            <div className="panel-body">
                <Controller
                    control={control}
                    name={"images"}
                    render={({onChange}) => (
                        <ImageUploading
                            onChange={(imageList, addUpdateIndex) => {
                                onSelectImg(imageList, addUpdateIndex);
                                onChange(imageList)
                            }}
                            multiple
                            maxFileSize={5242880}
                            imgExtension={['.jpg', '.png', '.gif']}
                            maxNumber={maxNumberImg}
                            dataURLKey="data_url"
                            value={images}
                        >
                            {({
                                  imageList,
                                  onImageUpload,
                                  onImageRemoveAll,
                                  onImageUpdate,
                                  onImageRemove,
                              }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    {currentNumImg !== maxNumberImg ?
                                        <div className={"btn btn-success"}
                                             onClick={onImageUpload}>Add images

                                        </div>
                                        : <div className={"btn btn-success"} disabled>
                                            Add images

                                        </div>
                                    }
                                    <div className={"btn btn-danger pull-right"}
                                         onClick={onImageRemoveAll}>Remove all images
                                    </div>

                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item" align={"center"}>
                                            <br/>
                                            <div className="image-container"
                                                 title={!index ? "Main image" : "Secondary image"}>
                                                <img src={image['data_url']} alt="main-image"/>
                                                <div className="image-item__btn-wrapper">
                                                    <div className={"image-buttons"}>
                                                        <div className={"image-container-text"}>
                                                            {!index ? "Main image" : "Secondary image"}
                                                        </div>
                                                        <div
                                                            className={"btn btn-success image-container-btn-edit"}
                                                            onClick={() => onImageUpdate(index)}><span
                                                            className={"ti-pencil"}> </span>
                                                        </div>
                                                        <div
                                                            className={"image-container-btn-remove btn btn-danger"}
                                                            onClick={() => onImageRemove(index)}><span
                                                            className={"ti-trash"}> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/*{onAddImages &&*/}
                                    {/*<div className="col-xa-12">*/}
                                    {/*    /!*<ul className="product__small__images" role="tablist">*!/*/}
                                    {/*    /!*    {[...Array(currentNumImg)].map((item, index) => (*!/*/}
                                    {/*    /!*        <li className="pot-small-img active cursor-pointer"*!/*/}
                                    {/*    /!*            key={index}>*!/*/}
                                    {/*    /!*            {imageList[index] ?*!/*/}
                                    {/*    /!*                <img*!/*/}
                                    {/*    /!*                    onClick={() => onImageUpdate(index)}*!/*/}
                                    {/*    /!*                    src={imageList[index] ? imageList[index].data_url : imageProduct}*!/*/}
                                    {/*    /!*                    alt={"photo2"}/>*!/*/}
                                    {/*    /!*                : <div className={"img-squad-mini"}*!/*/}
                                    {/*    /!*                       align={"center"}*!/*/}
                                    {/*    /!*                       onClick={() => onImageUpdate(index)}>*!/*/}
                                    {/*    /!*                <span style={{"font-size": "40px"}}*!/*/}
                                    {/*    /!*                      className={"ti-image"}> </span>*!/*/}
                                    {/*    /!*                </div>*!/*/}
                                    {/*    /!*            }*!/*/}
                                    {/*    /!*        </li>*!/*/}
                                    {/*    /!*    ))}*!/*/}
                                    {/*    /!*    <li className="pot-small-img active cursor-pointer">*!/*/}
                                    {/*    /!*        <div*!/*/}
                                    {/*    /!*            className="plus-button">{onAddImages ? "-" : "+"}</div>*!/*/}
                                    {/*    /!*    </li>*!/*/}
                                    {/*    /!*</ul>*!/*/}
                                    {/*    <div className="cursor-pointer">*/}
                                    {/*        {imageList[0] ?*/}
                                    {/*            <img onClick={() => onImageUpdate(0)}*/}
                                    {/*                 src={imageList[0] ? imageList[0].data_url : bigImage}*/}
                                    {/*                 alt={"photo2"}/>*/}
                                    {/*            : <div className={"img-squad"}*/}
                                    {/*                   onClick={() => onImageUpdate(0)}><span*/}
                                    {/*                style={{"font-size": "80px"}}*/}
                                    {/*                className={"ti-image"}> </span></div>*/}
                                    {/*        }*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*}*/}


                                </div>
                            )}
                        </ImageUploading>
                    )}
                />
            </div>
        </section>
    )
}



