import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import about_img_1 from "../../resources/images/about-us/01.jpg"
import about_img_2 from "../../resources/images/about-us/photo-13.jpg"
import about_img_3 from "../../resources/images/about-us/photo-61.jpg"
import React from "react";

export const AboutUs = () => {
    return (
        <>
            <Breadcrumb namePage={"Про Нас"}/>
             <div className={"mt--50"}></div>
            <div className={"container"}>
                <div className={" form-row"}>
                    <div className={"col-md-12"}>
                        <div className={"col-md-6 col-xa-6 "}>
                            <img className={"mtb--10"} src={about_img_3} alt=""/>
                        </div>
                        <div className={"col-md-6 col-xa-6"}>
                            <h1 className={"mtb--10 text-center"}>Наша історія</h1>
                            <p className={"text-justify first-paragraph"}>Швейна фабрика,
                                напрямком нашої діяльності є пошиття трикотажного одягу для жінок
                                (плаття, блузи, кардигани, спідниці, штани). У своїй роботі ми
                                використовуємо давальницьку сировину (тканина, нитки, фурнітура та
                                ін.) для виготовлення продукції. Нашими партнерами є великі швейні
                                підприємства західного регіону. </p>
                            <br/>
                            <p className={"text-justify first-paragraph"}>Ми співпрацюємо з німецькою компанією
                                Bonprix, яка є однією з
                                провідних фірм у сфері дистанційної торгівлі модним одягом та
                                аксесуарами. На сьогоднішній день ми виробляємо 26000 одиниць на
                                місяць високоякісних жіночих виробів.</p>
                            <br/>
                            <p className={"text-justify first-paragraph"}>Також одним з наших основних партнерів
                                являється німецька компанія
                                Rabe, для якої ми щомісячно виробляємо 6000 одиниць сучасних та
                                завжди модних трикотажних виробів.</p>
                        </div>
                    </div>
                    <div className={"col-md-12"}>
                        <div className={"col-md-6 col-xa-6  "}>
                            <h1 className={"mtb--10 text-center"}>Наше місцезнаходження та фабрика із
                                середини</h1>
                            <p className={"text-justify first-paragraph"}>Головна фабрика розташована у місті
                                Дрогобич. Виробництво складається
                                з трьох цехів – закрійного, швейного, пакувального, в яких
                                відбуваються всі процеси створення виробу – від розкрою до пакування
                                готової продукції. У своїй роботі ми використовуємо тільки
                                найсучасніше обладнання від провідних виробників.</p>
                        </div>
                        <div className={"col-md-6 col-xa-6"}>
                            <img className={"mtb--10"} src={about_img_2} alt=""/>
                        </div>
                    </div>
                    <div className={"col-md-12"}>
                        <div className={"col-md-6 col-xa-6 "}>
                            <img className={"mtb--10"} src={about_img_1} alt=""/>
                        </div>
                        <div className={"col-md-6 col-xa-6"}>
                            <h1 className={"mtb--10 text-center"}>Умови праці</h1>
                            <p className={"text-justify first-paragraph"}>Фабрика поділена на 3 виробничі зони
                                (цехи), що дозволяє
                                безперешкодно
                                кожному із працівників виконувати свою роботу. Усі виробничі
                                приміщення
                                оснащені системою вентиляції та кондиціонування, що забезпечує
                                комфортні
                                умови праці.</p>
                        </div>
                    </div>
                </div>

            </div>
        <div className={"mb--100"}></div>

        </>
    )
}