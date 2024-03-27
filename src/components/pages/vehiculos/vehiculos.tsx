import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Modal, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVehiculosUser } from '../../../data/vehiculos';
import { deleteVehiculo} from '../../../data/vehiculos';
import  decodeJWT  from '../../../utils/decodeToken';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const jwtDecode = require('jwt-decode');


export default function Vehiculos() {

  const [vehiculos, setvehiculos] = useState([]);
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  

  useEffect(() => {
    // Aquí se obtiene el ID del usuario y se cargan los datos del calendario
    const cargarDatos = async () => {
    const token = await AsyncStorage.getItem('auth-token');
      //const idUsuario = await AsyncStorage.getItem('userId');
      const decoded = decodeJWT(token);
      // console.log("decoded: "+decoded.id);
      setUserId(decoded.id);
      
      const datosVehiculo = await getVehiculosUser(decoded.id);
      //console.log(datosCalendario);
        setvehiculos(datosVehiculo);
    };
    const unsubscribe = navigation.addListener('focus', () => {
      // Recargar datos del calendario cuando la pantalla obtiene el foco
      cargarDatos();
  });

    cargarDatos();
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    

    return (
      <TouchableOpacity style={styles.rowContainer} onPress={() => handleRowPress(item)}>
        <View style={styles.column}>
          <Text style={styles.columnText}>{item.patente}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>{item.marca}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>{item.modelo}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>{item.color}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>{item.año}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>{item.kilometraje}</Text>
        </View>
        
      </TouchableOpacity>
    );
  };

  const handleNavigation = (route: string,navigation) => {
    setModalVisible(false);
    navigation.navigate(route, { vehiculo: selectedItem });
  };

  //Funcion para abrir menu de opciones cuando se presiona una fila de la tabla
  const handleRowPress = (item) => {
   console.log("Presionado: "+item.patente);
   setSelectedItem(item);
   setModalVisible(true);
   console.log("Modal: "+modalVisible);
   
  };

  //Funcion para abrir la pantalla de agregar calendario
  function handleAddEvent(navigation): void {
    navigation.navigate('AgregarVehiculo');
  }

  //Eliminar un elemento de la fila
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

    const handleEliminarCalendario = async (id) => {
        try {
            const res = await deleteVehiculo(id);
            console.log(res);
            setModalVisible(false);
            setModalDeleteVisible(false);
            // Recargar datos del calendario
            const datosCalendario = await getVehiculosUser(userId);
            setvehiculos(datosCalendario);
            setModalDeleteVisible(false);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
      <Text style={styles.heading}>Vehiculos</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddEvent(navigation)}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="add-outline" size={35} color="black" />
          <Text style={styles.text}>Agregar</Text>
        </View>
      </TouchableOpacity>
      {/* Encabezados de columna */}
      <View style={styles.rowContainer}>
        <Text style={styles.columnHeading}>Patente</Text>
        <Text style={styles.columnHeading}>Marca</Text>
        <Text style={styles.columnHeading}>Modelo</Text>
        <Text style={styles.columnHeading}>Color</Text>
        <Text style={styles.columnHeading}>Año</Text>
        <Text style={styles.columnHeading}>Kilometraje</Text>
        {/* Otros encabezados de columna */}
      </View>
      <FlatList
        data={vehiculos}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => handleNavigation('EditarVehiculo',navigation)}>
              <Text style={styles.modalText}>Editar Vehiculo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalDeleteVisible(true)}>
              <Text style={styles.modalText}>Eliminar Vehiculo </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
            animationType="fade"
            transparent={true}
            visible={modalDeleteVisible}
            onRequestClose={() => setModalDeleteVisible(false)}>
                 <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setModalDeleteVisible(false)}>
                <View style={styles.modalView}>
                    <Text>¿Estás seguro que deseas eliminar este vehiculo?</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Eliminar" onPress={() => handleEliminarCalendario(selectedItem._id)} />
                        <Button title="Cancelar" onPress={() => setModalDeleteVisible(false)} />
                    </View>
                </View>
                </TouchableOpacity>
            </Modal>
      </SafeAreaView>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Puedes ajustar esto según tus necesidades
    marginVertical: 1, // Añade un margen si es necesario
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

    // ... Otros estilos
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
