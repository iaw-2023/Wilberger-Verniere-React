import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: 'https://wilberger-verniere-laravel-zxwy-phsp7wap5-iawv.vercel.app',
    withCredentials: true,
});
 
export default apiClient;