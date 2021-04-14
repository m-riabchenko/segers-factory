import imageG from "../../resources/images/main-page/02.jpg"
import imageM from "../../resources/images/main-page/photo-94.jpg"
import icon1 from "../../resources/images/main-page/icon-1.png"
import icon2 from "../../resources/images/main-page/sewing-machines.png"
import icon3 from "../../resources/images/main-page/icon-3.png"
import icon4 from "../../resources/images/main-page/icon-4.png"

export const Main = () => {
    return (
        <>
            <div className={"container-large"}>

                <section className="htc__store__area ptb--120">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section__title section__title--2 text-center">
                                    <h2 className="title__line">
                                        <i>ТзОВ &#xab;Сегеш-Україна&#xbb;</i></h2>
                                    <p>Товариство з обмеженою відповідальністю Сегеш – Україна. Дата
                                        заснування 15 грудня 2003 року. Адреса: Україна, 47100,
                                        Тернопільська обл., Шумський р-н. місто Шумськ, вул.
                                        Гагаріна. Основний вид діяльності виробництво
                                        робочого одягу, верхнього одягу, спіднього одягу та ін.</p>
                                </div>
                                <div className="store__btn">
                                    <a href="#">contact us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={"main-page-block hidden-md hidden-sm hidden-xs "}>
                    <img src={imageG} className={"main-page-img img-left"} alt=""/>
                    <div className={"main-page-card-text card-left"}>
                        <h2><b>Великі обсяги та висока якість</b></h2>
                        <br/>
                        <p>В нас хороші умови праці та сучасне
                            обладнання,
                            швачки постійно підвищують свій рівень майстерності</p>
                        <a className={"panel-btn cursor-pointer"}>Детальніше</a>
                    </div>
                </div>

                <div className="panel  visible-md visible-sm visible-xs ">
                    <div className="panel-body">
                        <img src={imageG} className={"main-page-img-mobile"} alt=""/>
                        <div className={"main-page-card-text-mobile "}>
                            <h2><b>Великі обсяги та висока якість</b></h2>
                            <br/>
                            <p>В нас хороші умови праці та сучасне
                                обладнання,
                                швачки постійно підвищують свій рівень майстерності</p>
                            <a className={"panel-btn cursor-pointer"}>Детальніше</a>
                        </div>
                    </div>
                </div>

                <div className={"container mt--60 mb--60"}>
                    <div className={"form-row"}>
                        <div className={"col-xs-12 col-sm-6 col-md-3"}>
                            <div className="panel panel-default">
                                <div className="panel-body panel-center-content">
                                    <img src={icon3} alt=""/>
                                    <p className={"panel-head-text"}>Власний одяг </p>
                                    <p className={"panel-body-text"}>Розробляємо і шиємо власні
                                        моделі для продажу у своєму інтернет-магазині</p>
                                    <a className={"panel-btn cursor-pointer"}>Детальніше</a>

                                </div>
                            </div>
                        </div>
                        <div className={"col-xs-12 col-sm-6 col-md-3"}>
                            <div className="panel panel-default">
                                <div className="panel-body panel-center-content">
                                    <img src={icon1} alt=""/>
                                    <p className={"panel-head-text"}>Пошиття під замовлення</p>
                                    <p className={"panel-body-text"}>Пошиття ваших моделей по
                                        індивідуальному замовленню.</p>
                                    <a className={"panel-btn cursor-pointer"}>Детальніше</a>
                                </div>
                            </div>
                        </div>
                        <div className={"col-xs-12 col-sm-6 col-md-3"}>
                            <div className="panel panel-default">
                                <div className="panel-body panel-center-content">
                                    <img src={icon2} alt=""/>
                                    <p className={"panel-head-text"}>Оптовий пошив одягу</p>
                                    <p className={"panel-body-text"}>Масове пошиття ваших моделей -
                                        швидко, якісно у великих
                                        обсягах.</p>
                                    <a className={"panel-btn cursor-pointer"}>Детальніше</a>
                                </div>
                            </div>
                        </div>

                        <div className={"col-xs-12 col-sm-6 col-md-3"}>
                            <div className="panel panel-default">
                                <div className="panel-body panel-center-content">
                                    <img src={icon4} alt=""/>
                                    <p className={"panel-head-text"}>Прінтування</p>
                                    <p className={"panel-body-text"}>Наносимо будь-яке зображення,
                                        на ваш вибір на футболки і інший одяг.</p>
                                    <a className={"panel-btn cursor-pointer"}>Детальніше</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div className={"main-page-block hidden-md hidden-sm hidden-xs"}>
                    <img src={imageM} className={"main-page-img img-right "} alt=""/>
                    <div className={"main-page-card-text card-right"}>
                        <h2><b>Сучасна техніка дозволяє робити великі обсяги</b></h2>
                        <br/>
                        <p>Висококваліфікований персонал робить викройки моделей одягу швидко і
                            якісно</p>
                        <a className={"panel-btn cursor-pointer"}>Детальніше</a>
                    </div>
                </div>
            </div>

            <div className="panel visible-md visible-sm visible-xs">
                <div className="panel-body">
                    <img src={imageM} className={"main-page-img-mobile"} alt=""/>
                    <div className={"main-page-card-text-mobile "}>
                        <h2><b>Сучасна техніка дозволяє робити великі обсяги</b></h2>
                        <br/>
                        <p>Висококваліфікований персонал робить викройки моделей одягу швидко і
                            якісно</p>
                        <a className={"panel-btn cursor-pointer"}>Детальніше</a>
                    </div>
                </div>
            </div>

        </>
    )
}