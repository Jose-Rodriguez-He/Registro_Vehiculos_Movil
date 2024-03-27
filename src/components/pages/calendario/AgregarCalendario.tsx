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
    const handleAgregar = async (navigation) => {
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
      setShow(false);
      const currentDate = selectedDate || fechaInicio;
      setFechaInicio(currentDate);
    };
  
    // const showDatePicker = () => {
    //   setModalVisible(true);
    // };
  
    const showMode = (modeToShow) => {
      setShow(true);
      setMode(modeToShow);
    };
    
    // function handleAddEvent(e): void {
    //   navigation.navigate('Calendario');
    // }

    const formatFechaHora = (fecha) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return fecha.toLocaleDateString('es-ES', options);
    };

return (
  <View style={styles.container}>
    <Text style={styles.heading}>Agregar una Cita</Text>
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
      value={formatFechaHora(fechaInicio)} // Convert fechaInicio to string
      onChangeText={(text) => setFechaInicio(new Date(text))} // Update onChangeText callback
      placeholder={"Elija una fecha y hora"}
      editable={false}
    />
    <View style={styles.buttonContainer}>

    <Button title="Seleccionar fecha" onPress={()=>showMode('date')} />
    <Button title="Seleccionar hora" onPress={()=>showMode('time')} />
    {show && mode === 'date' &&
      <DateTimePicker
        testID="dateTimePicker"
        value={fechaInicio}
        mode={"date"}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    }
    {show && mode === 'time' &&
      <DateTimePicker
        testID="dateTimePicker"
        value={fechaInicio}
        mode={"time"}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    }
    {fechaInicioErr && <Text style={styles.error}>Seleccione una fecha de inicio válida</Text>}

    </View>
      
    {/* <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={hideDatePicker}>
      {renderDatePicker()}
    </Modal> */}

    {/* <Text style={styles.label}>Estado de la actividad:</Text> */}

    <Text style={styles.label}>Descripción:</Text>
    <TextInput
      style={styles.input}
      value={descripcion}
      onChangeText={setDescripcion}
      placeholder="Ingrese una descripción"
    />
    {descripcionErr && <Text style={styles.error}>Ingrese una descripción válida</Text>}

    {/* <Text style={styles.label}>Propietario ID:</Text>
    <TextInput
      style={styles.input}
      value={propietario_id}
      onChangeText={setPropietario_id}
      placeholder="Ingrese el ID del propietario"
    /> */}
    {/* {propietario_idErr && <Text style={styles.error}>Ingrese un ID de propietario válido</Text>} */}

    <Button
      title="Agregar"
      onPress={()=>handleAgregar(navigation)}
    />
  </View>
);
        

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Puedes ajustar esto según tus necesidades
    marginVertical: 1, // Añade un margen si es necesario
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
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
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
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