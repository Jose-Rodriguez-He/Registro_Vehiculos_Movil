import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, TextInput, Switch, Platform, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerFiltroCalendario,crearItemCalendario } from '../../../data/CalendarioData';
import { ObtenerUserId } from '../../../utils/DatosUsarioToken';
import DateTimePicker from '@react-native-community/datetimepicker';
import  decodeJWT  from '../../../utils/decodeToken';


export default function AgregarCalendario() {

    const [userId, setUserId] = useState('');
    //Variables para el datepicker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty')

    const [nombreAct, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);

    const [fechaInicio, setFechaInicio] = useState<Date>();
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
        if (nombreAct === "") {
            setNombreErr(true);
        } else if (fechaInicio === undefined) {
            setFechaInicioErr(true);
        } else if (estadoActividad === undefined) {
            setEstadoActividadErr(true);
        } else if (descripcion === "") {
            setDescripcionErr(true);
        } else if (propietario_id === "") {
            setPropietario_idErr(true);
        } else {
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
                alert('Actividad agregada con exito');
            } catch (error) {
                console.error("Error al agregar la actividad: ", error);
                alert('Error al agregar actividad');
            }
        }
    }
    //Funcion para el datepicker
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(true);
      setDate(currentDate);
  
      // Process the date values
      let tempDate = new Date(currentDate);
      setFechaInicio(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes()
      setText(fDate)
  
      // Log the Time & Date values
      console.log(fTime)
      console.log(tempDate)
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const renderDate = () => {
      return(
      <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{text}</Text>
      <View style={{ margin: 20 }}>
        <Button onPress={() => showMode('date')} title="DatePicker" />
      </View>
      <View style={{ margin: 20 }}>
        <Button onPress={() => showMode('time')} title="TimePicker" />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={fechaInicio}
          //mode={"datetime"}
          is24Hour={true}
          display="default"
          onChange={onChange} 
        />
      )}
    </View>
    );
  }

return (
  <View style={styles.container}>
    <Text style={styles.label}>Nombre de la actividad:</Text>
    <TextInput
    style={styles.input}
      value={nombreAct}
      onChangeText={setNombre}
      placeholder="Ingrese el nombre de la actividad"
    />
    {nombreErr && <Text style={styles.error}>Ingrese un nombre válido</Text>}

    <Text style={styles.label}>Fecha de inicio:</Text>
    <Button title='Seleccionar fecha' onPress={() => setModalVisible(true)} />
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        {renderDate()}
    </Modal>
    {/* <DatePicker
      style={styles.datePicker}
      date={fechaInicio}
      onDateChange={setFechaInicio}
      mode="date"
      placeholder="Seleccione la fecha de inicio"
    /> */}
    {fechaInicioErr && <Text style={styles.error}>Seleccione una fecha de inicio válida</Text>}

    <Text style={styles.label}>Estado de la actividad:</Text>

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
    {propietario_idErr && <Text style={styles.error}>Ingrese un ID de propietario válido</Text>}

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
});