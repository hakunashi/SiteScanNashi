import axios from 'axios';
import { config } from '../config'

export const saveUser = (data) => {
    return axios.post(config.api_url + '/api/v1/users/save', data)
        .then((response) => {
            return response.data;
        })
}

export const loginUser = (data) => {
    return axios.post(config.api_url + '/api/v1/users/login', data)
        .then((response) => {
            return response.data;
        })
}

export const editProfil = (data, id) => {
    const token = window.localStorage.getItem('w4y-token');
    return axios.put(config.api_url + '/api/v1/users/update/' + id, data, {headers: {"x-access-token": token}})
        .then((response)=>{
            return response.data
        })
}
