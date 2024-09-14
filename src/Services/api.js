import axios from 'axios';
 
const apiClient = axios.create({
    //baseURL: 'https://wilberger-verniere-laravel-zxwy.vercel.app/',
    baseURL: 'https://wilberger-verniere-laravel-zxwy-ovyuhjowr-iawv.vercel.app/',
    withCredentials: true,
});
 
export default apiClient;