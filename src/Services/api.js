import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: 'https://wilberger-verniere-laravel-zxwy-myoqo7p6x-iawv.vercel.app',
    withCredentials: true,
});
 
export default apiClient;