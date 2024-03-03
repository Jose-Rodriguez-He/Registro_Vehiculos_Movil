import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements'; // Puedes usar react-native-elements para los íconos
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL, TOKEN_SECRET } from '@env';


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();
    //const Url = API_URL;
    //console.log(Url);

    const handleSubmit = async () => {
        try {
            const res = await global.fetch(`http://192.168.1.7:3001/api/usuario/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await res.json();
            if (res.status === 200) {
                Alert.alert("Inicio de sesión exitoso");
                await AsyncStorage.setItem("auth-token", data.data.token);
                setEmail("");
                setPassword("");
                // Navegar a la página de inicio aquí
                console.log(navigation);
                navigation.navigate('Landing');
            } else if (res.status === 401) {
                Alert.alert("Correo incorrecto");
            } else if (res.status === 400) {
                Alert.alert("Contraseña incorrecta");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Inicio de sesión</Text>
            <View style={{ width: '80%' }}>
                <Text>Email</Text>
                <TextInput
                    placeholder="Correo"
                    value={email}
                    onChangeText={setEmail}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                />
                <Text>Contraseña</Text>
                <TextInput
                    placeholder="*******"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                />
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={{ backgroundColor: '#005FFF', padding: 15, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ color: '#FFFFFF' }}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
