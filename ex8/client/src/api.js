// https://medium.com/@ryanmambou/how-to-add-an-authorization-header-using-axios-b3abc3ae623c
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.107.121:4000/',
    timeout: 1000,
});

api.interceptors.request.use(
    (config) => { 
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
