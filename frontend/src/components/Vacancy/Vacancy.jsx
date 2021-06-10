import {vacancyAPI} from "../../api/VacancyAPI";
import React, {useEffect, useState} from "react";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import {useToggle} from "react-use";
import {ModalWindow} from "./ModalWindow";

export const Vacancy = () => {
    const [vacancies, setVacancies] = useState([])
    const [openModal, toggleOpenModal] = useToggle(false)
    const [currentVacancy, setVacancy] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await vacancyAPI.getVacancies();
            setVacancies(response.data)
        })()
    }, [])

    const onRespondVacancy = (vacancy) => {
        setVacancy(vacancy)
        toggleOpenModal()
    }

    return (
        <>
            <Breadcrumb namePage={"Вакансії"}/>
            <div className={"container"}>

                {vacancies ? vacancies.map(vacancy => (
                        <>
                            <div className={"form-row mt--50"}>
                                <div className={"col-md-6 col-lg-6 col-sm-12 col-xs-12\""}>
                                                                    <hr/>

                                    <h1 className={"mtb--20"}><b>{vacancy.position}</b></h1>
                                    <div className={"default-li"}
                                         dangerouslySetInnerHTML={{__html: vacancy.description}}></div>
                                    <div className="panel-btn cursor-pointer"
                                         onClick={() => onRespondVacancy(vacancy)}>
                                        Відкгукнутись
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                    :
                    <h1 className={"mt--150 mb--150"}>На даний момент немає відкритих вакансій</h1>}
                {openModal && <ModalWindow toggle={toggleOpenModal} vacancy={currentVacancy}/>}

            </div>
            <br/>
            <br/>
            <br/>
        </>
    )
}