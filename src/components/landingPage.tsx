import React from 'react';
import { View, Text, Image, StyleSheet,SafeAreaView, Dimensions } from 'react-native';
import TopNavBar from './TopBarNav/topbar';
import Auto_Imagen from '../../public/Auto_Imagen.svg';

// Obtén las dimensiones de la ventana
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topNavBarContainer}>
      <View style={styles.topNavBarContainer}>
        <TopNavBar />
      </View>
      </SafeAreaView>
      <View style={styles.centerContent}>
      <Auto_Imagen
          //ajustar la imagen
          width={windowWidth}
          height={windowHeight * 0.3} // Ajusta esto según tus necesidades
          style={{ ...styles.imagen, aspectRatio: 0.5 }}
          // style={styles.image}
        />
        <Text style={styles.heading}>
          El mantenimiento de tu auto al alcance de tu mano
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topNavBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 20,
  },
  centerContent: {
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    flex:1,
    //borderRadius: 100, // Esto hará que la imagen sea circular
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
});
