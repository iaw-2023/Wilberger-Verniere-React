import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: 'https://wilberger-verniere-laravel-zxwy-654813js7-iawv.vercel.app',
    withCredentials: true,
});
 
export default apiClient;