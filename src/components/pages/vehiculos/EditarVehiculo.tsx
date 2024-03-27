import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, TextInput, Switch, Platform, Modal, Alert } from 'react-native';
import { updateVehiculo} from '../../../data/vehiculos';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


export default function EditarVehiculo({route}) {
    const vehiculo = route.params.vehiculo;

    const [userId, setUserId] = useState('');
    const navigation = useNavigation();

    const [patente, setPatente] = useState<string>(vehiculo.patente);
    const [patenteErr, setPatenteErr] = useState<boolean>(false);
    const [marca, setMarca] = useState<string>(vehiculo.marca);
    const [marcaErr, setMarcaErr] = useState<boolean>(false);
    const [modelo, setModelo] = useState<string>(vehiculo.modelo);
    const [modeloErr, setModeloErr] = useState<boolean>(false);
    const [color, setColor] = useState<string>(vehiculo.color);
    const [colorErr, setColorErr] = useState<boolean>(false);
    const [año, setAño] = useState<string>(vehiculo.año);
    const [añoErr, setAñoErr] = useState<boolean>(false);
    const [kilometraje, setKilometraje] = useState<number>(vehiculo.kilometraje);
    const [kilometrajeErr, setKilometrajeErr] = useState<boolean>(false);

    
    //propietario_id
    const [propietario_id, setPropietario_id] = useState<string>(vehiculo.propietario_id);
    const [propietario_idErr, setPropietario_idErr] = useState<boolean>(false);

    const [modalVisible, setModalVisible] = useState(false);

    //funcion handle para agregar un nuevo calendario a la BD
    const handleEditar = async (navigation) => {
      console.log("llego a handleAgregar");
        if (patente === "" || modelo === "" || marca === "") {
            Alert.alert('Error', 'Por favor complete todos los campos');
        return;
        } 
        const item = {
            patente: patente,
            marca:marca,
            modelo:modelo,
            color:color,
            año:año,
            kilometraje:kilometraje,
            //propietario_id: propietario_id
        }
        console.log(item);
        try {
            const res = await updateVehiculo(vehiculo._id,item);
            console.log("Respuesta:",res);
            Alert.alert('El vehiculo ha sido editado','El vehiculo ha sido modificado en la base de datos',[
            {text: 'OK', onPress: () => navigation.navigate('Vehiculos')}
            ]);
        } catch (error) {
            console.error("Error al editar el vehiculo: ", error);
            Alert.alert('Error','Ha ocurrido un error, intente nuevamente',[
            {text: 'OK', onPress: () => console.log('OK Pressed')}
            ]);
        }
        
    }

return (
  <View style={styles.container}>
    
    <Text style={styles.label}>Patente del vehiculo:</Text>
    <TextInput
    style={styles.input}
      value={patente}
      onChangeText={setPatente}
      placeholder="Ingrese la patente del vehiculo"
      editable={false}
    />
    {patenteErr && <Text style={styles.error}>Ingrese una patente válido</Text>}

    <Text style={styles.label}>Marca  del vehículo:</Text>
    <TextInput
    style={styles.input}
      value={marca} // Convert fechaInicio to string
      onChangeText={setMarca} // Update onChangeText callback
      placeholder="Ingresa la marca de tu vehiculo"
    />
    {marcaErr && <Text style={styles.error}>Ingrese una marca valida</Text>}

    <Text style={styles.label}>Modelo  del vehiculo:</Text>
    <TextInput
      style={styles.input}
      value={modelo}
      onChangeText={setModelo}
      placeholder="Ingrese un modelo de vehiculo"
    />
    {modeloErr && <Text style={styles.error}>Ingrese un modelo válido</Text>}
    
    <Text style={styles.label}>Color del vehiculo:</Text>
    <TextInput
      style={styles.input}
      value={color}
      onChangeText={setColor}
      placeholder="Ingrese el  color del vehiculo"
    />

    <Text style={styles.label}>Año del vehiculo:</Text>
    <TextInput
      style={styles.input}
      value={año}
      onChangeText={setAño}
      placeholder="Ingrese el año del vehiculo"
      />

    <Text style={styles.label}>Kilometraje del vehiculo:</Text>
    
    <TextInput
    style={styles.input}
    onChangeText={text => setKilometraje(Number(text))}
    value={kilometraje !== undefined ? kilometraje.toString() : ''}
    keyboardType='numeric'
    placeholder="Ingresa el kilometraje del vehiculo"
    />

    {/* <Text style={styles.label}>Propietario ID:</Text>
    <TextInput
      style={styles.input}
      value={propietario_id}
      onChangeText={setPropietario_id}
      placeholder="Ingrese el ID del propietario"
    /> */}
    {/* {propietario_idErr && <Text style={styles.error}>Ingrese un ID de propietario válido</Text>} */}

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