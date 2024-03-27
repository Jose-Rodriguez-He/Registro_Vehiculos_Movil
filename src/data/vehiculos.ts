import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, TOKEN_SECRET } from "@env";

export interface IModeloVehiculos {
  patente: string;
  marca: string;
  modelo: string;
  color?: string;
  año?: string;
  kilometraje?: number;
  propietario_id?: string;

  _id?: string; // id de mongoDB
}

const getVehiculo = async (id: string) => {
  const res = await axios.get(`${API_URL}/vehiculos/getone/${id}`);
  return res.data;
};

const getDatosVehiculo = async (id: string) => {
  const res = await axios.get(`${API_URL}/vehiculo/${id}`);
  console.log(res.data);
  return res.data;
};

const getVehiculos = async () => {
  const res = await axios.get(`${API_URL}/vehiculos/getall`);
  return res.data;
};

const getVehiculosUser = async (userId: string) => {
  try {
    // console.log("Userid: ",userId);
    const AllLista = await axios.get(`${API_URL}/vehiculos/getall`);
    console.log(typeof AllLista.data);
    const res = AllLista.data.filter(
      (item: any) => item.propietario_id === userId
    );
    //console.log("res.data: ",res.data);
    return res;
  } catch (error) {
    console.error("Error fetching vehicular data:");
    throw error;
  }
};

const deleteVehiculo = async (id: string) => {
  const res = await axios.delete(`${API_URL}/vehiculos/delete/`, {
    data: { id },
  });
  return res.data;
};

const updateVehiculo = async (id: string, vehiculoData: IModeloVehiculos) => {
  console.log(vehiculoData);
  console.log("id: " + id);
  const token = await AsyncStorage.getItem("auth-token");

  console.log(token);
  const headers = {
    "auth-token": token,
  };
  const res = await axios.put(`${API_URL}/vehiculos/edit/${id}`, vehiculoData, {
    headers,
  });

  return res.data;
};

const registerVehiculo = async (vehiculoData: IModeloVehiculos) => {
  const token = await AsyncStorage.getItem("auth-token");

  const headers = {
    "auth-token": token,
  };

  const res = await axios.post(`${API_URL}/vehiculos/create`, vehiculoData, {
    headers,
  });
  return res.data;
};

export {
  getVehiculo,
  getVehiculos,
  getVehiculosUser,
  updateVehiculo,
  deleteVehiculo,
  registerVehiculo,
  getDatosVehiculo,
};
