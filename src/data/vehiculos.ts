import axios from "axios";

export interface IModeloVehiculos{
    patente: string;
    marca: string;
    modelo: string;
    color?: string;
    año?: string;
    kilometraje?:number;
    propietario_id: string;

    createdAt?: Date; // timestamp
    updatedAt?: Date; // timestamp

    _id?: string; // id de mongoDB
    __v?: number; // dios sabrá que es esto
}

const getVehiculo = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/vehiculos/getone/${id}`);
    return res.data;
}

const getDatosVehiculo =async (id:string) => {
    const res = await axios.get(`${process.env.API_URL}/vehiculo/${id}`);
    console.log(res.data);
    return res.data;
    
}

const getVehiculos = async () => {
    const res = await axios.get(`${process.env.API_URL}/vehiculos/getall`);
    return res.data;
}

const getVehiculosUser = async (userId: string) => {
    try{
    const AllLista = await axios.get(`${process.env.API_URL}/vehiculos/getall`);
    const res = AllLista.data.filter((item: any) => item.propietario_id === userId);
    return res;
    }catch (error){
        console.error("Error fetching vehicular data:");
        throw error;
    }
}

const deleteVehiculo = async (id: string) => {
    const res = await axios.delete(`${process.env.API_URL}/vehiculos/delete/`,{
        data: { id },
    });
    return res.data;
}

const updateVehiculo = async (id: string, vehiculoData: IModeloVehiculos) => {
    console.log(vehiculoData);
    const token = localStorage.getItem('auth-token');
    const headers = {
        'auth-token': token,
    };
    const res = await axios.put(`${process.env.API_URL}/vehiculos/edit/${id}`, vehiculoData,{headers});
    return res.data;
}

const registerVehiculo = async (vehiculoData: IModeloVehiculos) => {
    const token = localStorage.getItem('auth-token');
    const headers = {
        'auth-token': token,
    };
    console.log(vehiculoData);
    const res = await axios.post(`${process.env.API_URL}/vehiculos/create`, vehiculoData,{headers});
   
    return res.data;
}

export {
    getVehiculo,
    getVehiculos,
    getVehiculosUser,
    updateVehiculo,
    deleteVehiculo,
    registerVehiculo,
    getDatosVehiculo

}