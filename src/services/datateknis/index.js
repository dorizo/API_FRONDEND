import axios, { catchCallBack } from '../config';
import qs from 'qs';

const ADD_PROJECT_SUB = (projectxxxx) => {
    console.log(projectxxxx);
    const data = qs.stringify(projectxxxx);
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`Datateknis/Addprojectsub`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_PROJECT_KHSV2 = (projectxxxx) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`Datateknis/Addprojectkhsv2`, projectxxxx, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_PROJECT_KHSV2_DETAIL = (dataprog) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`Datateknis/Addproject_khs_v2_detail`, dataprog, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const SUB_PROJEC_VIEW = (kodeproject) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`Datateknis/showsubkategori/id_project/${kodeproject}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DESIGNATOR_VIEW_ALL = (Search) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`designator/all/search/${Search}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
// eslint-disable-next-line import/prefer-default-export
export { ADD_PROJECT_SUB, SUB_PROJEC_VIEW, ADD_PROJECT_KHSV2, DESIGNATOR_VIEW_ALL, ADD_PROJECT_KHSV2_DETAIL };
