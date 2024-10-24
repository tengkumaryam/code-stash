import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.107.121:4000/',
    timeout: 60000,
});

api.interceptors.request.use(
    (config) => { 
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;