import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: 'https://wilberger-verniere-laravel-zxwy-fkeqti6ds-iawv.vercel.app',
    withCredentials: true,
});
 
export default apiClient;