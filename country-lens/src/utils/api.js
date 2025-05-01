import axios from 'axios';

const API = axios.create({ baseURL: 'https://restcountries.com/v3.1' });

export const fetchCountries = async (endpoint = "/all") => {
    const response = await axios.get(`https://restcountries.com/v3.1${endpoint}`);
    return response;
};export const searchByName = async (name) => await API.get(`/name/${name}`);
export const filterByRegion = async (region) => await API.get(`/region/${region}`);
export const getByCode = async (code) => await API.get(`/alpha/${code}`);
