import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, TextInput, Switch, Platform, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerFiltroCalendario,crearItemCalendario } from '../../../data/CalendarioData';
import { ObtenerUserId } from '../../../utils/DatosUsarioToken';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import  decodeJWT  from '../../../utils/decodeToken';


export default function AgregarCalendario() {

    const [userId, setUserId] = useState('');
    const navigation = useNavigation();
    //Variables para el datepicker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty')

    const [nombreAct, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaInicioErr, setFechaInicioErr] = useState<boolean>(false);

    const [estadoActividad, setEstadoActividad] = useState<boolean>();
    const [estadoActividadErr, setEstadoActividadErr] = useState<boolean>(false);

    const [descripcion, setDescripcion] = useState<string>("");
    const [descripcionErr, setDescripcionErr] = useState<boolean>(false);
    //propietario_id
    const [propietario_id, setPropietario_id] = useState<string>("");
    const [propietario_idErr, setPropietario_idErr] = useState<boolean>(false);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // Aquí obtendrías el ID del usuario y cargarías los datos del calendario
        const cargarDatos = async () => {
        const token = await AsyncStorage.getItem('auth-token');
        const decoded = decodeJWT(token);
        console.log("decodedAgregar: "+decoded.id);
        setPropietario_id(decoded.id);
    
        };
    
        cargarDatos();
      }, []);

    //funcion handle para agregar un nuevo calendario a la BD
    const handleAgregar = async () => {
      console.log("llego a handleAgregar");
        if (nombreAct === "" || descripcion === "") {
            setNombreErr(true);
            setFechaInicioErr(true);
            setEstadoActividadErr(true);
            setDescripcionErr(true);
            setPropietario_idErr(true);
            Alert.alert('Error','Rellene los campos',[
              {text: 'OK', onPress: () => console.log('OK Pressed')}
            ]);
        } else {
          console.log("else:")
            const item = {
                nombreAct: nombreAct,
                fechaInicio: fechaInicio,
                estadoActividad: estadoActividad,
                descripcion: descripcion,
                propietario_id: propietario_id
            }
            console.log(item);
            try {
              const res = await crearItemCalendario(item);
              console.log(res);
              Alert.alert('Actividad agregada con exito','La actividad ha sido agregada a la base de datos',[
                {text: 'OK', onPress: () => navigation.navigate('Calendario')}
              ]);
            } catch (error) {
              console.error("Error al agregar la actividad: ", error);
              Alert.alert('Error','Ha ocurrido un error, intente nuevamente',[
                {text: 'OK', onPress: () => console.log('OK Pressed')}
              ]);
            }
        }
    }
    //Funcion para el datepicker
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || fechaInicio;
      setFechaInicio(currentDate);
      setModalVisible(false);
    };
  
    const showDatePicker = () => {
      setModalVisible(true);
    };
  
    const hideDatePicker = () => {
      setModalVisible(false);
    };
    
    function handleAddEvent(e): void {
      navigation.navigate('Calendario');
    }

    const renderDatePicker = () => {
      return (
        <View>
          {/* <TouchableOpacity onPress={hideDatePicker}>
            <Text>Cancelar</Text>
          </TouchableOpacity> */}
          <DateTimePicker
            testID="dateTimePicker"
            value={fechaInicio}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          <DateTimePicker
            testID="dateTimePicker"
            value={fechaInicio}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          
        </View>
      );
    };

return (
  <View style={styles.container}>
    {/* <TouchableOpacity
        style={styles.button}
        onPress={handleAddEvent}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="arrow-back-outline" size={35} color="black" />
          <Text style={styles.text}>Agregar</Text>
        </View>
      </TouchableOpacity> */}
    <Text style={styles.label}>Nombre de la actividad:</Text>
    <TextInput
    style={styles.input}
      value={nombreAct}
      onChangeText={setNombre}
      placeholder="Ingrese el nombre de la actividad"
    />
    {nombreErr && <Text style={styles.error}>Ingrese un nombre válido</Text>}

    <Text style={styles.label}>Fecha de inicio:</Text>
    <TextInput
    style={styles.input}
      value={fechaInicio.toString()} // Convert fechaInicio to string
      onChangeText={(text) => setFechaInicio(new Date(text))} // Update onChangeText callback
      placeholder={fechaInicio.toString()}
    />
    {/* {fechaInicioErr && <Text style={styles.error}>Fecha invalida</Text>} */}

    <Button title="Seleccionar fecha" onPress={showDatePicker} />
    {fechaInicioErr && <Text style={styles.error}>Seleccione una fecha de inicio válida</Text>}

    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={hideDatePicker}>
      {renderDatePicker()}
    </Modal>

    {/* <Text style={styles.label}>Estado de la actividad:</Text> */}

    <Text style={styles.label}>Descripción:</Text>
    <TextInput
      style={styles.input}
      value={descripcion}
      onChangeText={setDescripcion}
      placeholder="Ingrese una descripción"
    />
    {descripcionErr && <Text style={styles.error}>Ingrese una descripción válida</Text>}

    <Text style={styles.label}>Propietario ID:</Text>
    <TextInput
      style={styles.input}
      value={propietario_id}
      onChangeText={setPropietario_id}
      placeholder="Ingrese el ID del propietario"
    />
    {/* {propietario_idErr && <Text style={styles.error}>Ingrese un ID de propietario válido</Text>} */}

    <Button
      title="Agregar"
      onPress={handleAgregar}
    />
  </View>
);
        

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  datePicker: {
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
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
});