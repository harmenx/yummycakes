import axios from 'axios';
import { apiURL } from '../config';
import { Cake } from '../types/models'

export const getCakes = async () => {
    try {
        const result = await axios.get(`${apiURL}/cakes`);
        return result.data as Cake[];
    } catch (e) {
        return e.response ? e.response.status : undefined;
    }
}
export const getCake = async (id: number) => {
    try {
        const result = await axios.get<Cake>(`${apiURL}/cake/${id}`);
        return result;
    } catch (e) {
        return e.response ? e.response.status : undefined;
    }
}

export const updateCake = async (id: number) => {
    try {
        const result = await axios.put(`${apiURL}/cake/${id}`);
        return result;
    } catch (e) {
        return e.response ? e.response.status : undefined;
    }
}

export const createCake = async (cake: Cake) => {
    try {
        const result = await axios.post(`${apiURL}/cake`, cake);
        return result;
    } catch (e) {
        return e.response ? e.response.status : undefined;
    }
}
