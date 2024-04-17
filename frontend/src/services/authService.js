import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export function loginUser(credentials) {
    return axios.post(`${API_URL}login/`, credentials);
}