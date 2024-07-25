import axios from 'axios';

export const key = process.env.REACT_APP_API_KEY;

const instance = axios.create({
    baseURL: 'http://www.omdbapi.com',
});

instance.interceptors.request.use(
    (config) => {
        console.log('Loading started');
        config.params = {
            ...config.params,
            apikey: key,
        };
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

export default instance;
