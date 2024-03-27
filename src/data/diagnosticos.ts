import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, TOKEN_SECRET } from '@env';

export interface IDiagnosticoModel {
    nombre: string;
    fechaRegistro?: Date;
    nombreMecanico?:string;
    tipoDeServicio?:string;
    costoServicio?:number;
    piezasDañadas?:string;
    piezasPorComprar?:string;
    costoPiezas?:number;
    piezasCambiadas?:string;
    costoTotal?:number;
    descripcion: string;
    recomendacionMecanico?:string;
    vehiculo_id?: string,
    propietario_id?: string,

    createdAt?: Date; // timestamp
    updatedAt?: Date; // timestamp

    _id?: string; // id de mongoDB
    __v?: number; // dios sabrá que es esto
}

const getDiagnostico = async (id: string) => {
    const res = await axios.get(`${API_URL}/diagnosticos/getDiagnostico/${id}`);
    return res.data;
}

const getDiagnosticos = async () => {
    const res = await axios.get(`${API_URL}/diagnosticos/getAll`);
    return res.data;
}

const getDiagnosticosUser = async (userId: string) => {
    try{
    const AllLista = await axios.get(`${API_URL}/diagnosticos/getAll`);
    const res = AllLista.data.filter((item: any) => item.propietario_id === userId);
    return res;
    }catch (error){
        console.error("Error fetching diagnostic data:");
        throw error;
    }
}

const deleteDiagnostico = async (id: string) => {
    console.log(id);

    const res = await axios.delete(`${API_URL}/diagnosticos/delate/${id}`);
    return res.data;
}

const updateDiagnostico = async (id: string, diagnosticoData: IDiagnosticoModel) => {
    console.log("diagnosticoData: ",diagnosticoData);
    console.log("id: ",id);
    const token = await AsyncStorage.getItem('auth-token');
    const headers = {
        'auth-token': token,
    };
    const res = await axios.put(`${API_URL}/diagnosticos/actualizarDiagnostico/${id}`, diagnosticoData,{headers});
    console.log("res: ",res);
    return res.data;
}

const registerDiagnostico = async (diagnosticoData: IDiagnosticoModel) => {
    console.log("diagnosticoData: ",diagnosticoData);
    const token = await AsyncStorage.getItem('auth-token');

    const headers = {
        'auth-token': token,
    };

    console.log(headers);
    const res = await axios.post(`${API_URL}/diagnosticos/create`, diagnosticoData, {headers});
   
    return res.data;
}
export {
    getDiagnostico,
    getDiagnosticos,
    getDiagnosticosUser,
    updateDiagnostico,
    deleteDiagnostico,
    registerDiagnostico
}