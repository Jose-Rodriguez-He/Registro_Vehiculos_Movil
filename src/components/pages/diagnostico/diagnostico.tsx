import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDiagnosticosUser } from "../../../data/diagnosticos";
import { deleteDiagnostico } from "../../../data/diagnosticos";
import { getDatosVehiculo } from "../../../data/vehiculos";
import decodeJWT from "../../../utils/decodeToken";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const jwtDecode = require("jwt-decode");

const TableHeader = () => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.columnHeading}>Nombre</Text>
      <Text style={styles.columnHeading}>Fecha</Text>
      <Text style={styles.columnHeading}>Mecanico</Text>
      <Text style={styles.columnHeading}>Servicio</Text>
      <Text style={styles.columnHeading}>Costo Servicio</Text>
      <Text style={styles.columnHeading}>Piezas Dañadas</Text>
      <Text style={styles.columnHeading}>Piezas Por Comprar</Text>
      <Text style={styles.columnHeading}>Costo Piezas</Text>
      <Text style={styles.columnHeading}>Piezas Cambiadas</Text>
      <Text style={styles.columnHeading}>Costo Total</Text>
      <Text style={styles.columnHeading}>Descripcion</Text>
      <Text style={styles.columnHeading}>Recomendaciones</Text>
      <Text style={styles.columnHeading}>Vehiculo</Text>
      {/* Otros encabezados */}
    </View>
  );
};

export default function Diagnosticos() {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [userId, setUserId] = useState("");
  const [vehiculo, setVehiculo] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Aquí se obtiene el ID del usuario y se cargan los datos del calendario
    const cargarDatos = async () => {
      const token = await AsyncStorage.getItem("auth-token");
      //const idUsuario = await AsyncStorage.getItem('userId');
      const decoded = decodeJWT(token);
      // console.log("decoded: "+decoded.id);
      setUserId(decoded.id);
      try {
        const datosDiagnosticos = await getDiagnosticosUser(decoded.id);
        //console.log(datosCalendario);
        setDiagnosticos(datosDiagnosticos);
      } catch (error) {
        console.log(error);
      }
    };
    const unsubscribe = navigation.addListener("focus", () => {
      // Recargar datos del calendario cuando la pantalla obtiene el foco
      cargarDatos();
    });

    cargarDatos();
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => {
    // if (index === 0) {
    //   return <TableHeader />;
    // }

    const fechaRegistro = new Date(item.fechaRegistro);
    const formattedFechaRegistro = fechaRegistro.toLocaleString();
    // const datosVehiculo = await getDatosVehiculo(item._id);
    // console.log("Datos en render: ",item._id);

    //
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => handleRowPress(item)}
      >
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' }]}>{item.nombre}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' }]}>{formattedFechaRegistro}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center',marginLeft: 30 }]}>{item.nombreMecanico}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center',marginLeft: 30 }]}>{item.tipoDeServicio}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' ,marginLeft: 30}]}>{item.costoServicio}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' ,marginLeft: 70}]}>{item.piezasDañadas}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' ,marginLeft: 50}]}>{item.piezasPorComprar}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' }]}>{item.costoPiezas}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' }]}>{item.piezasCambiadas}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' }]}>{item.costoTotal}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' }]}>{item.descripcion}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' }]}>{item.recomendacionMecanico}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.columnText, { flexWrap: 'wrap', textAlign: 'center' }]}>{item.vehiculo_id}</Text>
        </View>

        {/* Otros datos que quieras mostrar como columnas */}
      </TouchableOpacity>
    );
  };

  // const renderItem_2 = ({ item }) => {

  //   return (
  //     <TouchableOpacity style={styles.rowContainer} onPress={() => handleRowPress(item)}>
  //       <View style={styles.column}>
  //         <Text style={styles.columnText}>{item.Nombre}</Text>
  //       </View>
  //       <View style={styles.column}>
  //         <Text style={styles.columnText}>{item.piezasDañadas}</Text>
  //       </View>
  //       <View style={styles.column}>
  //         <Text style={styles.columnText}>{item.piezasPorComprar}</Text>
  //       </View>
  //       <View style={styles.column}>
  //         <Text style={styles.columnText}>{item.costoPiezas}</Text>
  //       </View>
  //       <View style={styles.column}>
  //         <Text style={styles.columnText}>{item.piezasCambiadas}</Text>
  //       </View>
  //       <View style={styles.column}>
  //         <Text style={styles.columnText}>{item.costoTotal}</Text>
  //       </View>
  //       {/* Otros datos que quieras mostrar como columnas */}
  //     </TouchableOpacity>
  //   );
  // };

  // const renderItem_3 = ({ item }) => {
  //   const datosVehiculo = getDatosVehiculo(item._id);
  //   console.log(datosVehiculo);

  //   return (
  //     <TouchableOpacity style={styles.rowContainer} onPress={() => handleRowPress(item)}>
  //       <View style={styles.column}>
  //         <Text style={styles.columnText}>{item.Nombre}</Text>
  //       </View>
  //       <View style={styles.column}>
  //         <Text style={styles.columnText}>{item.descripcion}</Text>
  //       </View>
  //       <View style={styles.column}>
  //         <Text style={styles.columnText}>{item.recomendacionMecanico}</Text>
  //       </View>
  //       <View style={styles.column}>
  //         <Text style={styles.columnText}>{item.vehiculo_id}</Text>
  //       </View>
  //       {/* Otros datos que quieras mostrar como columnas */}
  //     </TouchableOpacity>
  //   );
  // };

  const handleNavigation = (route: string, navigation) => {
    setModalVisible(false);
    navigation.navigate(route, { diagnostico: selectedItem });
  };

  //Funcion para abrir menu de opciones cuando se presiona una fila de la tabla
  const handleRowPress = (item) => {
    console.log("Presionado: " + item.nombre);
    setSelectedItem(item);
    setModalVisible(true);
    console.log("Modal: " + modalVisible);
  };

  //Funcion para abrir la pantalla de agregar calendario
  function handleAddEvent(navigation): void {
    navigation.navigate("AgregarDiagnostico", { propietario_id: userId });
  }

  //Eliminar un elemento de la fila
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  const handleEliminarCalendario = async (id) => {
    try {
      const res = await deleteDiagnostico(id);
      console.log(res);
      setModalVisible(false);
      setModalDeleteVisible(false);
      try {
        // Recargar datos del calendario
        const datosDiagnosticos = await getDiagnosticosUser(userId);
        setDiagnosticos(datosDiagnosticos);
        setModalDeleteVisible(false);
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView >
        <Text style={styles.heading}>Diagnosticos</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddEvent(navigation)}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="add-outline" size={35} color="black" />
            <Text style={styles.text}>Agregar</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Encabezados de columna */}
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <View style={styles.rowContainer}>
          
            <Text style={[styles.columnHeading, {marginRight: 120}]}>Nombre</Text>
          
            <Text style={[styles.columnHeading,{marginRight: 120}]}>Fecha</Text>
         
            <Text style={styles.columnHeading}>Mecanico</Text>
         
            <Text style={styles.columnHeading}>Servicio</Text>
         
            <Text style={styles.columnHeading}>Costo Servicio</Text>
          
            <Text style={styles.columnHeading}>Piezas Dañadas</Text>
         
            <Text style={styles.columnHeading}>Piezas Por Comprar</Text>
          
            <Text style={styles.columnHeading}>Costo Piezas</Text>
          
            <Text style={styles.columnHeading}>Piezas Cambiadas</Text>
         
            <Text style={styles.columnHeading}>Costo Total</Text>
          
            <Text style={styles.columnHeading}>Descripcion</Text>
          
            <Text style={styles.columnHeading}>Recomendaciones</Text>
          
            <Text style={styles.columnHeading}>Vehiculo</Text>
         
        </View>

        <FlatList
          data={diagnosticos}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          nestedScrollEnabled={true}
        />
      </ScrollView>

      {/* <View style={styles.rowContainer}>
            
        </View>
        
        <FlatList
        data={diagnosticos}
        renderItem={renderItem_2}
        keyExtractor={(item) => item._id}
        nestedScrollEnabled = {true}
      />
       
        
        <View style={styles.rowContainer}>
            
        </View>
        
        <FlatList
        data={diagnosticos}
        renderItem={renderItem_3}
        keyExtractor={(item) => item._id}
        nestedScrollEnabled = {true}
      /> */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => handleNavigation("EditarDiagnostico", navigation)}
            >
              <Text style={styles.modalText}>Editar Diagnostico</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalDeleteVisible(true)}>
              <Text style={styles.modalText}>Eliminar Diagnostico </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDeleteVisible}
        onRequestClose={() => setModalDeleteVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalDeleteVisible(false)}
        >
          <View style={styles.modalView}>
            <Text>¿Estás seguro que deseas eliminar el calendario?</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Eliminar"
                onPress={() => handleEliminarCalendario(selectedItem._id)}
              />
              <Button
                title="Cancelar"
                onPress={() => setModalDeleteVisible(false)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
    color: "black",
    marginLeft: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Puedes ajustar esto según tus necesidades
    marginVertical: 1, // Añade un margen si es necesario
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  scrollContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 40,
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    marginVertical: 2,
  },
  column: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "200%",
    marginHorizontal: 5,
  },
  columnText: {
    textAlign: "center",
    width: "100%", // Ancho fijo para cada columna
    
  },
  columnHeading: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 10,
    width: "100%",
    marginHorizontal: 30,
    
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  // ... Otros estilos
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
