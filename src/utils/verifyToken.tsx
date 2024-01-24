import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('auth-token');
        console.log(token);
        if (token) {
          // Si existe un token, redirige a la página principal
          navigation.navigate('Landing');
        } else {
          // Si no hay token, redirige a la página de inicio de sesión
          navigation.navigate('Login');
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthLoadingScreen;
