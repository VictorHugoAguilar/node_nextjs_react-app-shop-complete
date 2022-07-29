import axios from 'axios';

const shopApi = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export default shopApi;