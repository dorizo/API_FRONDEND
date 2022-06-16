import axios, { catchCallBack } from '../config';
import qs from 'qs';

const GET_IMAGES = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post('uploadimage/getfile', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};

const UPLOAD_IMAGES = ({ level, files }) => {
    const formData = new FormData();
    formData.append('level', level);
    formData.append('files', files);

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
    };

    return axios
        .post(`uploadimage/all`, formData, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
