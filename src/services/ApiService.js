import axios from 'axios';

const BASE_URL = 'http://localhost:4200'

export const getRequest = async (path) =>  axios.get(`${BASE_URL}${path}`).then(r => r.data);

export const postRequest = async (path, data) => axios.post(`${BASE_URL}${path}`, data).then(r => r.data);

export const deleteRequest = async (path, data) => axios.delete(`${BASE_URL}${path}`, data).then(r => r.data);