import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { getUser, updateUser } from "../../../data/usuarios";
import { ObtenerUserId } from "../../../utils/DatosUsarioToken";
import { subirNewFile } from "../../../data/archivos";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import decodeJWT from "../../../utils/decodeToken";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "react-native-elements";
import { ImageSourcePropType } from 'react-native';

interface UserProfileState {
  name: string;
  rut: string;
  password: string;
  telefono?: string;
  email: string;
  foto?: string;
  _id?: string;
}

export default function Perfil() {
  const [profile, setProfile] = useState<UserProfileState>({
    _id: "",
    name: "",
    rut: "",
    password: "",
    telefono: "",
    email: "",
    foto: "",
  });

  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [rut, setRut] = useState("");
  const [rutErr, setRutErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [telefonoErr, setTelefonoErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [foto, setFoto] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const userId = ObtenerUserId();
  const [usuarioId, setUsuarioId] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const navigation = useNavigation();
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Aquí se obtiene el ID del usuario y se cargan los datos del calendario
    const cargarDatos = async () => {
      const token = await AsyncStorage.getItem("auth-token");
      //const idUsuario = await AsyncStorage.getItem('userId');
      const decoded = decodeJWT(token);
      // console.log("decoded: "+decoded.id);
      setUsuarioId(decoded.id);

      const datosUsuario = await getUser(decoded.id);
      //console.log("Datos: ",datosUsuario);
      setDataUser(datosUsuario);
      setProfile({
        _id: datosUsuario._id,
        name: datosUsuario.name,
        rut: datosUsuario.rut,
        password: datosUsuario.password,
        telefono: datosUsuario.telefono,
        email: datosUsuario.email,
        foto: datosUsuario.foto,
      });
    };
    const unsubscribe = navigation.addListener("focus", () => {
      // Recargar datos del calendario cuando la pantalla obtiene el foco
      cargarDatos();
    });

    cargarDatos();
    return unsubscribe;
  }, [navigation]);

  //console.log("DatosUser: ", dataUser);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAgregar = async (navigation) => {
    console.log("llego a handleAgregar");
    if (
      profile.name === "" ||
      profile.rut === "" ||
      profile.email === "" ||
      profile.password === "" ||
      profile.telefono === ""
    ) {
      setNameErr(true);
      setRutErr(true);
      setEmailErr(true);
      setPasswordErr(true);
      setTelefonoErr(true);
      Alert.alert("Error", "Rellene los campos", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      console.log("else:");
      //   const item = {
      //     name: name,
      //     rut: rut,
      //     email: email,
      //     password: password,
      //     telefono: telefono,
      //   };
      //   console.log(item);
      try {
        const res = await updateUser(usuarioId, profile);
        console.log(res);
        Alert.alert(
          "Actividad agregada con exito",
          "La actividad ha sido agregada a la base de datos",
          [{ text: "OK", onPress: () => navigation.navigate("Home") }]
        );
      } catch (error) {
        console.error("Error al agregar la actividad: ", error);
        Alert.alert("Error", "Ha ocurrido un error, intente nuevamente", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }
  };

  const handleImageChange = async (e: any, id, image) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("archivos", file);
      console.log(file);
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop();
      try {
        const folderName = "public"; // Asegúrate de establecer la ruta correcta
        const saveName = "img_user_" + profile._id + "." + fileExtension; // El nombre bajo el cual se guardará el archivo
        const tag = "Imagen"; // Una categoría o etiqueta para la imagen
        const acceso = true; // Si la imagen es pública o no
        const userName = profile.name; // El nombre del usuario que sube la imagen

        const uploadedFile = await subirNewFile(
          formData,
          folderName,
          saveName,
          tag,
          acceso,
          userName
        );
        console.log(uploadedFile.url);
        // const baseDir = 'backend';
        // const url = uploadedFile.url.split('.').pop()
        // const fullUrl = baseDir + url+"/"+saveName;
        // console.log(fullUrl);
        const fullUrl = `http://localhost:3000/upload/public/${saveName}`;
        //setProfile({ ...profile, foto: fullUrl });
        // Actualiza el estado y la base de datos con la nueva URL de la imagen

        // Aquí podrías llamar a una función para actualizar la información del usuario en la base de datos
        const newProfile = { ...profile, foto: uploadedFile.url };
        await updateUser(usuarioId, newProfile);

        // Actualizar el estado con la nueva URL
        setProfile(newProfile);
      } catch (error) {
        console.error("Error al subir la imagen", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text>Perfil</Text>

        <Image source={require('../../../../public/image.png')} style={styles.avatar} />
        <Text>Nombre</Text>
        <TextInput
          style={[styles.input, styles.inputEmail]}
          placeholder="Nombre"
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
        />
        <Text>Rut</Text>
        <TextInput
          style={[styles.input, styles.inputEmail]}
          placeholder="Rut"
          value={profile.rut}
          onChangeText={(text) => setProfile({ ...profile, rut: text })}
        />
        <Text>Email</Text>
        <TextInput
          style={[styles.input, styles.inputEmail]}
          placeholder="Correo"
          value={profile.email}
          onChangeText={(text) => setProfile({ ...profile, email: text })}
        />
        <Text>Telefono</Text>
        <TextInput
          style={[styles.input, styles.inputEmail]}
          placeholder="Telefono"
          value={profile.telefono}
          onChangeText={(text) => setProfile({ ...profile, telefono: text })}
        />
        <Button
          title="Actualizar Foto"
          onPress={() => fileInputRef.current.click()}
        />
        <Button title="Guardar" onPress={() => handleAgregar(navigation)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    marginTop: 30,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10
  },
  inputEmail: {
    width: 300,
  },
});
