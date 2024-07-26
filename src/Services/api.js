import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: 'https://wilberger-verniere-laravel-zxwy-d0k7bir76-iawv.vercel.app',
    withCredentials: true,
});
 
export default apiClient;