import axios from "axios";

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
    const res = await axios.get(`${process.env.API_URL}/usuario/${id}`);
    return res.data;
}

const getUsers = async () => {
    const res = await axios.get(`${process.env.API_URL}/usuarios`);
    return res.data;
}

const deleteUser = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/usuario/delete/${id}`);
    return res.data;
}

const updateUser = async (id: string, userData: IUsuarioModel) => {
    console.log(userData);
    const token = localStorage.getItem('auth-token');
    const headers = {
        'auth-token': token,
    };
    const res = await axios.put(`${process.env.API_URL}/usuario/update/${id}`, userData,{headers});
    return res.data;
}

const registerUser = async (userData: IUsuarioModel) => {
    const res = await axios.post(`${process.env.API_URL}/usuario/register`, userData);
    return res.data;
}

const loginUser = async (email: string, password: string) => {
    const res = await axios.post(`${process.env.API_URL}/usuario/login`, { email, password });
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
