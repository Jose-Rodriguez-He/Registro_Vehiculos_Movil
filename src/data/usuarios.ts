import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, TOKEN_SECRET } from '@env';

export interface IUsuarioModel {
    name: string;
    rut: string,
    email: string;
    password: string;
    rol?: string[], // referenciado
    telefono?: string,
    foto?: string

    createdAt?: Date; // timestamp
    updatedAt?: Date; // timestamp

    _id?: string; // id de mongoDB
    __v?: number; // dios sabrá que es esto
}

const getUser = async (id: string) => {
    const res = await axios.get(`${API_URL}/usuario/${id}`);
    return res.data;
}

const getUsers = async () => {
    const res = await axios.get(`${API_URL}/usuarios`);
    return res.data;
}

const deleteUser = async (id: string) => {
    const res = await axios.get(`${API_URL}/usuario/delete/${id}`);
    return res.data;
}

const updateUser = async (id: string, userData: IUsuarioModel) => {
    console.log(userData);
    const token = await AsyncStorage.getItem('auth-token');
    const headers = {
        'auth-token': token,
    };
    const res = await axios.put(`${API_URL}/usuario/update/${id}`, userData,{headers});
    return res.data;
}

const registerUser = async (userData: IUsuarioModel) => {
    const res = await axios.post(`${API_URL}/usuario/register`, userData);
    return res.data;
}

const loginUser = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/usuario/login`, { email, password });
    return res.data;
}

export {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    registerUser,
    loginUser
};
