import axios, { AxiosResponse } from "axios";
import { API_URL, TOKEN_SECRET } from '@env';
export interface ItemCalendario {
    nombreAct: string;
    fechaInicio?: Date;
    estadoActividad: boolean;
    descripcion: string;
    propietario_id?: string;
    _id?: string;
}

const obtenerListaCalendario = async () => {
    try {
        const res = await axios.get(`${API_URL}/calendario/getall`);
        return res.data;
    } catch (error) {
        console.error("Error fetching calendar data:", error);
        throw error; // Rethrow the error to be caught by the caller
    }
};

const obtenerFiltroCalendario = async (userId: string) => {
    try {
        console.log("Url del backend "+ API_URL);
        const AllLista = await axios.get(`${API_URL}/calendario/getall`);
        console.log(userId);
        const res = AllLista.data.filter((item: any) => item.propietario_id === userId);
        //console.log(AllLista.data);
        return res;
    } catch (error) {
        console.error("Error fetching calendar data:", error);
        throw error; // Rethrow the error to be caught by the caller
    }
};

const crearItemCalendario = async (item: ItemCalendario) => {
    console.log("Llego a crear");
    const res = await axios.post(
        `${process.env.API_URL}/calendario/create`,
        item
    );
    return res.data;
};

const editarItemCalendario = async (id: string, newItem: ItemCalendario) => {
    const res = await axios.put(`${process.env.API_URL}/calendario/edit/${id}`,
      newItem,
    );
    return res.data;
  };

const eliminarItemCalendario = async (id: string) => {
    const res = await axios.delete(`${process.env.API_URL}/calendario/delete`, {
        data: { id },
    });
    console.log(res);
    return res.data;
};

export {
    obtenerListaCalendario,
    obtenerFiltroCalendario,
    crearItemCalendario,
    editarItemCalendario,
    eliminarItemCalendario,
}