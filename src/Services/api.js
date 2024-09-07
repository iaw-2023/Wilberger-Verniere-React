import axios from 'axios';
 
const apiClient = axios.create({
    //baseURL: 'https://wilberger-verniere-laravel-zxwy.vercel.app/',
    baseURL: 'https://wilberger-verniere-laravel-zxwy-mr20kcx38-iawv.vercel.app/',
    withCredentials: true,
});
 
export default apiClient;