import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'http://127.0.0.1:8090/',
    timeout: 10000,
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization':'Basic bGVhcm5pbmdtYW5hZ2VtZW50c3lzdGVtOmRmMDVlNGVmLTA4YWUtNDk1MC1hYWVjLTI5ZGFiZGE1YWQ2Mg==',
        
    }
  });