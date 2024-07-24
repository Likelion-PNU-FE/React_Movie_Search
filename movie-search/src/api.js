import axios from 'axios';

const api = axios.create({
    baseURL: 'http://www.omdbapi.com',
    params: {
        apikey: process.env.REACT_APP_API_KEY,
    },
});

api.interceptors.request.use(
    (config) => {
        console.log('Request sent: ', config);
        return config;
    },
    (error) => {
        console.error('Request error: ', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('Response received: ', response);
        return response;
    },
    (error) => {
        console.error('Response error: ', error);
        return Promise.reject(error);
    }
);

export default api;
