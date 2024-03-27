import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'; // Asegúrate de tener react-native-elements

function TopNavBar() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleNavigation = (route: string,navigation) => {
    setModalVisible(false);
    navigation.navigate(route);
  };

  const handleLogout = async (navigation) => {
    try {
      await AsyncStorage.removeItem('auth-token');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="menu" size={30} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => handleNavigation('Perfil',navigation)}>
            <Text style={styles.modalText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Calendario',navigation)}>
            <Text style={styles.modalText}>Calendario</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Vehiculos',navigation)}>
            <Text style={styles.modalText}>Vehículos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Diagnosticos',navigation)}>
            <Text style={styles.modalText}>Diagnósticos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogout(navigation)}>
            <Text style={styles.modalText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
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

export default TopNavBar;
