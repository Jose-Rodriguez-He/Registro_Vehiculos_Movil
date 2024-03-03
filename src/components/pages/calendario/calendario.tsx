import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerFiltroCalendario } from '../../../data/CalendarioData';
import  decodeJWT  from '../../../utils/decodeToken';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const jwtDecode = require('jwt-decode');


export default function CalendarioBody() {
  const [calendarios, setCalendarios] = useState([]);
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();
  

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
      //console.log(datosCalendario);
        setCalendarios(datosCalendario);
    };

    cargarDatos();
  }, []);

  const renderItem = ({ item }) => {
    const fechaInicio = new Date(item.fechaInicio);
    const formattedFechaInicio = fechaInicio.toLocaleString();

    return (
      <TouchableOpacity style={styles.rowContainer} onPress={() => handleRowPress(item)}>
        <View style={styles.column}>
          <Text style={styles.columnText}>{item.nombreAct}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>{formattedFechaInicio}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>{item.descripcion}</Text>
        </View>
        {/* Otros datos que quieras mostrar como columnas */}
      </TouchableOpacity>
    );
  };

  const handleRowPress = (item) => {
    // Lógica para manejar la pulsación de una fila
  };

  function handleAddEvent(e): void {
    navigation.navigate('AgregarCalendario');
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.heading}>Calendario</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddEvent}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="add-outline" size={35} color="black" />
          <Text style={styles.text}>Agregar</Text>
        </View>
      </TouchableOpacity>
      {/* Encabezados de columna */}
      <View style={styles.rowContainer}>
        <Text style={styles.columnHeading}>Nombre</Text>
        <Text style={styles.columnHeading}>Fecha</Text>
        <Text style={styles.columnHeading}>Descripción</Text>
        {/* Otros encabezados de columna */}
      </View>
      <FlatList
        data={calendarios}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#008CBA',
    padding: 0,
    // borderRadius: 5,
  },
  text: {
    color: 'black',
    marginLeft: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnText: {
    textAlign: 'center',
  },
  columnHeading: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  });
