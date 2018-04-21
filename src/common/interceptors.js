import axios from 'axios';

axios.interceptors.request.use( (config) => {
    // Do something before request is sent
    console.log('config', config);
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});
