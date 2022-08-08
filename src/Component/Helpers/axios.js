import axios from 'axios';
import Config from './Config'

const instance = axios.create({
    baseURL: Config.api,
    timeout: 6000,
    headers: {
        accept: 'application/json',
    },
});

export default instance