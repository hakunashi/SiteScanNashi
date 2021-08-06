import axios from "axios";
import { config } from '../config';

export const checkToken = () => {

    const token = window.localStorage.getItem('scn-token');

    return axios.get(config.api_url + '/auth/checkToken', { headers: { 'x-access-token': token } })
        .then((response) => {
            return response.data
        })

}