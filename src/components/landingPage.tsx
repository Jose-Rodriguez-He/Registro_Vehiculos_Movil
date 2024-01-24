import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import TopNavBar from './TopBarNav/topbar';

export default function LandingPage() {
  return (
    <View style={styles.container}>
    <TopNavBar />
      <Image
        source={require('../../public/Auto Imagen.png')} // Asegúrate de cambiar la ruta de la imagen
        //ajustar la imagen
        style={{ width: 500, height: 350 } }
        // style={styles.image}
      />
      <Text style={styles.heading}>
        El mantenimiento de tu auto al alcance de tu mano
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200, // Ajusta estas dimensiones según tus necesidades
    height: 200,
    borderRadius: 100, // Esto hará que la imagen sea circular
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
});
