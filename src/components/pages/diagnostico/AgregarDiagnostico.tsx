import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, TextInput, Switch, Platform, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerDiagnostico } from '../../../data/diagnosticos';
import { getVehiculosUser } from '../../../data/vehiculos';
import { ObtenerUserId } from '../../../utils/DatosUsarioToken';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import  decodeJWT  from '../../../utils/decodeToken';
import { ScrollView } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';


export default function AgregarDiagnostico({route}) {
    console.log(route.params.propietario_id);
    const [vehiculos, setvehiculos] = useState([]);
    
    const [selectedValue, setSelectedValue] = useState();
    

    const [userId, setUserId] = useState('');
    const navigation = useNavigation();
    //Variables para el datepicker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const [nombre, setNombre] = useState<string>("");
    const [nombreErr, setNombreErr] = useState<boolean>(false);
    const [fechaRegistro, setFechaRegistro] = useState(new Date());
    const [fechaRegistroErr, setFechaRegistroErr] = useState<boolean>(false);
    const [nombreMecanico, setNombreMecanico] = useState<string>("");
    const [nombreMecanicoErr, setNombreMecanicoErr] = useState<boolean>(false);
    const [tipoDeServicio, setTipoDeServicio] = useState<string>("");
    const [tipoDeServicioErr, setTipoDeServicioErr] = useState<boolean>(false);
    const [costoServicio, setCostoServicio] = useState<number>(0);
    const [costoServicioErr, setCostoServicioErr] = useState<boolean>(false);
    const [piezasDañadas, setPiezasDañadas] = useState<string>("");
    const [piezasDañadasErr, setPiezasDañadasErr] = useState<boolean>(false);
    const [piezasPorComprar, setPiezasPorComprar] = useState<string>("");
    const [piezasPorComprarErr, setPiezasPorComprarErr] = useState<boolean>(false);
    const [costoPiezas, setCostoPiezas] = useState<number>(0);
    const [costoPiezasErr, setCostoPiezasErr] = useState<boolean>(false);
    const [piezasCambiadas, setPiezasCambiadas] = useState<string>("");
    const [piezasCambiadasErr, setPiezasCambiadasErr] = useState<boolean>(false);
    const [costoTotal, setCostoTotal] = useState<number>(0);
    const [costoTotalErr, setCostoTotalErr] = useState<boolean>(false);
    const [descripcion, setDescripcion] = useState<string>("");
    const [descripcionErr, setDescripcionErr] = useState<boolean>(false);
    const [recomendacionMecanico, setRecomendacionMecanico] = useState<string>("");
    const [recomendacionMecanicoErr, setRecomendacionMecanicoErr] = useState<boolean>(false);
    const [vehiculo_id, setVehiculo_id] = useState<string>("");
    const [vehiculo_idErr, setVehiculo_idErr] = useState<boolean>(false);
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

        const vehiculos = await getVehiculosUser(route.params.propietario_id);
        setvehiculos(vehiculos);
        console.log(vehiculos);
    
        };
    
        cargarDatos();
      }, []);

      console.log("data: ",vehiculos);

    //funcion handle para agregar un nuevo calendario a la BD
    const handleAgregar = async (navigation) => {
      console.log("llego a handleAgregar");
        if (nombre === "") {
            setNombreErr(true);
            setFechaRegistroErr(true);
            setNombreMecanicoErr(true);
            setTipoDeServicioErr(true);
            setCostoServicioErr(true);
            setPiezasDañadasErr(true);
            setPiezasPorComprarErr(true);
            setCostoPiezasErr(true);
            setPiezasCambiadasErr(true);
            setCostoTotalErr(true);
            setDescripcionErr(true);
            setRecomendacionMecanicoErr(true);
            setVehiculo_idErr(true);
            setPropietario_idErr(true);
            Alert.alert('Error','Rellene los campos',[
              {text: 'OK', onPress: () => console.log('OK Pressed')}
            ]);
        } else {
          console.log("else:")
            const item = {
                nombre: nombre,
                fechaRegistro: fechaRegistro,
                nombreMecanico: nombreMecanico,
                tipoDeServicio: tipoDeServicio,
                costoServicio: costoServicio,
                piezasDañadas: piezasDañadas,
                piezasPorComprar: piezasPorComprar,
                costoPiezas: costoPiezas,
                piezasCambiadas: piezasCambiadas,
                costoTotal: costoTotal,
                descripcion: descripcion,
                recomendacionMecanico: recomendacionMecanico,
                vehiculo_id: vehiculo_id,
                propietario_id: propietario_id,
            }
            console.log(item);
            try {
              const res = await registerDiagnostico(item);
              console.log(res);
              Alert.alert('Actividad agregada con exito','La actividad ha sido agregada a la base de datos',[
                {text: 'OK', onPress: () => navigation.navigate('Diagnosticos')}
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
      const currentDate = selectedDate || fechaRegistro;
      setFechaRegistro(currentDate);
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
    <ScrollView>
    <Text style={styles.label}>Nombre del Diagnostico:</Text>
    <TextInput
    style={styles.input}
      value={nombre}
      onChangeText={setNombre}
      placeholder=" Ingrese algun nombre"
    />
    {nombreErr && <Text style={styles.error}>Ingrese un nombre válido</Text>}

    <Text style={styles.label}>Fecha de inicio:</Text>
    <TextInput
    style={styles.input}
      value={formatFechaHora(fechaRegistro)} // Convert fechaInicio to string
      onChangeText={(text) => setFechaRegistro(new Date(text))} // Update onChangeText callback
      placeholder={" Elija una fecha y hora"}
      editable={false}
    />
    <View style={styles.buttonContainer}>

    <Button title="Seleccionar fecha" onPress={()=>showMode('date')} />
    <Button title="Seleccionar hora" onPress={()=>showMode('time')} />
    {show && mode === 'date' &&
      <DateTimePicker
        testID="dateTimePicker"
        value={fechaRegistro}
        mode={"date"}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    }
    {show && mode === 'time' &&
      <DateTimePicker
        testID="dateTimePicker"
        value={fechaRegistro}
        mode={"time"}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    }
    {fechaRegistroErr && <Text style={styles.error}>Seleccione una fecha de inicio válida</Text>}

    </View>
      
    <Text style={styles.label}>Nombre del Mecanico:</Text>
    <TextInput
      style={styles.input}
      value={nombreMecanico}
      onChangeText={setNombreMecanico}
      placeholder=" Ingrese el nombre del mecanico"
    />
    {nombreMecanicoErr && <Text style={styles.error}>Ingrese un nombre válido</Text>}

    <Text style={styles.label}>Tipo de Servicio:</Text>
    <Picker 
      selectedValue={tipoDeServicio}
      style={styles.picker}
      onValueChange ={itemValue => setTipoDeServicio(itemValue)} >
        <Picker.Item label="Mantenimiento" value="Mantenimiento"/>
        <Picker.Item label="Reparación" value="Reparación"/>
        <Picker.Item label="Revisión" value="Revisión"/>
        <Picker.Item label="Cambio de Piezas" value="Cambio de Piezas"/>
      </Picker>
    <Text style={styles.label}>Costo del Servicio:</Text>
    <TextInput
    style={styles.input}
    onChangeText={text => setCostoServicio(Number(text))}
    value={" "+costoServicio.toString()}
    keyboardType='numeric'
    placeholder="0"
    />

    <Text style={styles.label}>Piezas Dañadas:</Text>
    <TextInput
      style={styles.input}
      value={piezasDañadas}
      onChangeText={setPiezasDañadas}
      placeholder=" Ingrese las piezas dañadas"
    />

    <Text style={styles.label}>Piezas Por Comprar:</Text>
    <TextInput
      style={styles.input}
      value={piezasPorComprar}
      onChangeText={setPiezasPorComprar}
      placeholder=" Ingrese las piezas por comprar"
    />

    <Text style={styles.label}>Costo de las Piezas:</Text>
    <TextInput
        style={styles.input}
        onChangeText={text => setCostoPiezas(Number(text))}
        value={" "+ costoPiezas.toString()}
        keyboardType='numeric'
        placeholder="0"
    />

    <Text style={styles.label}>Piezas Cambiadas:</Text>
    <TextInput
      style={styles.input}
      value={piezasCambiadas}
      onChangeText={setPiezasCambiadas}
      placeholder=" Ingrese las piezas cambiadas"
    />

    {/* <Text style={styles.label}>Costo Total:</Text>
    <TextInput
        style={styles.input}
        onChangeText={text => setCostoTotal(Number(text))}
        value={costoTotal.toString()}
        keyboardType='numeric'
        placeholder="0"
    /> */}

    <Text style={styles.label}>Descripción:</Text>
    <TextInput
      style={styles.input}
      value={descripcion}
      onChangeText={setDescripcion}
      placeholder=" Ingrese una descripción"
    />
    {descripcionErr && <Text style={styles.error}>Ingrese una descripción válida</Text>}

    <Text style={styles.label}>Recomendación del Mecanico:</Text>
    <TextInput
      style={styles.input}
      value={recomendacionMecanico}
      onChangeText={setRecomendacionMecanico}
      placeholder=" Ingrese una recomendación"
    />

    <Text style={styles.label}>Elige un vehiculo</Text>
    <Picker
    style={styles.picker}
    selectedValue={selectedValue}
    onValueChange={(value) => {
        setSelectedValue(value);
        setvehiculos(vehiculos);
        setVehiculo_id(value);
      }}
    >
    {vehiculos && vehiculos.map((item) => (
        <Picker.Item key={item._id} label={item.patente} value={item._id} />
    ))}
    </Picker>

    <Button
      title="Agregar"
      onPress={()=>handleAgregar(navigation)}
    />
    </ScrollView>
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
  },
  picker: {
    borderColor: 'black', // Color del borde
    borderWidth: 1, // Ancho del borde
    borderRadius: 5, // Radio de la esquina del borde
    marginBottom: 10,
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