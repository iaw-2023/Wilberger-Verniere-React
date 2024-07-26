import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: 'https://wilberger-verniere-laravel-zxwy-ivc0b67wa-iawv.vercel.app',
    withCredentials: true,
});
 
export default apiClient;