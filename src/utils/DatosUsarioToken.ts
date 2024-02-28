import AsyncStorage from '@react-native-async-storage/async-storage';
import decodeJWT from './decodeToken';

export async function ObtenerUserId(){
    const token = await AsyncStorage.getItem('auth-token');
    if(!token) return null;  //No hay token guardada en el dispositivo
    try{
    //const idUsuario = await AsyncStorage.getItem('userId');
        const decoded = decodeJWT(token);
        const UserId = decoded.id;
        console.log(UserId);
        return UserId;
    }catch(error){
        console.error("Error al obtener el id del usuario: ", error);
        return null;
    }
}

export function ObtenerUserName(){
    const token = AsyncStorage.getItem('auth-token');
    if(!token) return null;  //No hay token guardada en el dispositivo
    try{
        const decoded  = decodeJWT(token);
        const UserName = decoded.name;
        return UserName;
    } catch (error) {
        console.error("Error al obtener el nombre del usuario: ", error);
        return null;
    }
}
