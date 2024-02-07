import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerFiltroCalendario } from '../../../data/CalendarioData';
import  decodeJWT  from '../../../utils/decodeToken';
const jwtDecode = require('jwt-decode');
import { Buffer } from 'buffer';

export default function CalendarioBody() {
  const [calendarios, setCalendarios] = useState([]);
  const [userId, setUserId] = useState('');
  

  useEffect(() => {
    // Aquí obtendrías el ID del usuario y cargarías los datos del calendario
    const cargarDatos = async () => {
    const token = await AsyncStorage.getItem('auth-token');
      //const idUsuario = await AsyncStorage.getItem('userId');
      const decoded = decodeJWT(token);
      console.log("decoded: "+decoded.id);
      setUserId(decoded.id);
      
      // Aquí llamarías a obtenerFiltroCalendario u obtenerListaCalendario
      const datosCalendario = await obtenerFiltroCalendario(decoded.id);
      console.log(datosCalendario);
        setCalendarios(datosCalendario);
    };

    cargarDatos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>Nombre: {item.nombreAct}</Text>
      <Text>Fecha: {item.fechaInicio}</Text>
      {/* <Text>Propietario: {userId}</Text> */}
      <Text>Descripción: {item.descripcion}</Text>
      {/* Botones de editar y eliminar */}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
        <Text style={styles.heading}> Estas en calendario</Text>
      <FlatList
        data={calendarios}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      
      {/* Aquí podrías agregar botones para agregar un nuevo calendario */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200, // Ajusta estas dimensiones según tus necesidades
      height: 200,
      borderRadius: 100, // Esto hará que la imagen sea circular
    },
    heading: {
      fontSize: 24,
      textAlign: 'center',
      marginTop: 20,
    },
  });
