import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, TextInput,Alert} from 'react-native';
import { editarItemCalendario } from '../../../data/CalendarioData';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function EditarCalendario({route}) {
   
    const calendario = route.params.calendario;
    console.log(calendario);
    const navigation = useNavigation()

    const [date, setDate] = useState(new Date());
    const [nombreAct, setNombre] = useState<string>(calendario.nombreAct);
    const [nombreErr, setNombreErr] = useState<boolean>(false);
    const [fechaInicio, setFechaInicio] = useState<Date>(new Date(calendario.fechaInicio));
    const [fechaInicioErr, setFechaInicioErr] = useState<boolean>(false);
    const [estadoActividad, setEstadoActividad] = useState<boolean>(false);
    const [descripcion, setDescripcion] = useState<string>(calendario.descripcion);
    const [descripcionErr, setDescripcionErr] = useState<boolean>(false);
    const [propietario_id, setPropietario_id] = useState<string>(calendario.propietario_id);
    const [propietario_idErr, setPropietario_idErr] = useState<boolean>(false);

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

     //Funcion para el datepicker
     const onChange = (event, selectedDate) => {
        setShow(false);
        const currentDate = selectedDate || fechaInicio;
        setFechaInicio(currentDate);
      };
    
      const showMode = (modeToShow) => {
        setShow(true);
        setMode(modeToShow);
      };
    
      //funcion handle para agregar un nuevo calendario a la BD
    const handleEditar = async (navigation) => {
        // Verificar la validez de los campos antes de editar el calendario
    if (!nombreAct || !fechaInicio || !descripcion) {
        Alert.alert('Error', 'Por favor complete todos los campos');
        return;
    }

    // Construir el objeto de calendario actualizado
    const calendarioActualizado = {
        _id: calendario._id, // Mantener el ID original
        nombreAct: nombreAct,
        fechaInicio: fechaInicio,
        estadoActividad: estadoActividad,
        descripcion: descripcion,
        propietario_id: propietario_id, // Puedes mantener el propietario original o cambiarlo si es necesario
        // Agrega otros campos si los necesitas
    };
        
        try {
        const res = await editarItemCalendario(calendario._id,calendarioActualizado);
        console.log(res);
        Alert.alert('Actividad editada con exito','La actividad ha sido agregada a la base de datos',[
            {text: 'OK', onPress: () => navigation.navigate('Calendario')}
        ]);
        } catch (error) {
        console.error("Error al actualizar la actividad: ", error);
        Alert.alert('Error','Ha ocurrido un error, intente nuevamente',[
            {text: 'OK', onPress: () => console.log('OK Pressed')}
        ]);
        }
          
    };

    const formatFechaHora = (fecha) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return fecha.toLocaleDateString('es-ES', options);
    };
    

    return(
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
            <TextInput
            style={styles.input}
            value={formatFechaHora(fechaInicio)} // Convert fechaInicio to string
            onChangeText={(text) => setFechaInicio(new Date(text))} // Update onChangeText callback
            placeholder={fechaInicio.toLocaleDateString()}
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

            <Text style={styles.label}>Descripción:</Text>
            <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Ingrese una descripción"
            />
            {descripcionErr && <Text style={styles.error}>Ingrese una descripción válida</Text>}

            <Button
            title="Guardar Cambios"
            onPress={()=>handleEditar(navigation)}
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