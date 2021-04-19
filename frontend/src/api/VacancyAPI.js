import {axios} from "./utils";

const getVacancies = async () => {
    return await axios.get(`job/vacancies/`)
}

const sendResume = async (data, vacancyID, resumeFile) => {
    let formData = new FormData();
    formData.append('first_name', data['firstName']);
    formData.append('last_name', data['lastName']);
    formData.append('phone', data['phone']);
    formData.append('cover_letter', data['coverLetter']);
    formData.append('vacancy', vacancyID);
    formData.append('resume', resumeFile);
    axios.defaults.headers.common["Content-Type"] = "multipart/form-data"
    return await axios.post(`job/resume/`, formData)
}


export const vacancyAPI = {
    getVacancies,
    sendResume,
}