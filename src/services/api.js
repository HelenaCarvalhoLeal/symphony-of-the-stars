import axios from 'axios';

const apiKey = 'fa31b6b1-41ea-4a65-a0a0-425fee67d218';

const api = axios.create()

api.interceptors.request.use(config => {
    config.headers['X-API-KEY'] = apiKey;
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;