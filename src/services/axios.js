import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'http://127.0.0.1:8090/',
    timeout: 10000,
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization':'Basic Z295Z295cHJvamVjdDpkZjA1ZTRlZi0wOGFlLTQ5NTAtYWFlYy0yOWRhYmRhNWFkNjI=',
        
    }
  });