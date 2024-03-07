import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/components/login.tsx';
import LandingPage from './src/components/landingPage.tsx';
// import PerfilPage from './src/components/perfil.tsx';
import CalendarioBody from './src/components/pages/calendario/calendario.tsx';
import AgregarCalendario from './src/components/pages/calendario/AgregarCalendario.tsx';
// import DiagnosticoPage from './src/components/diagnostico.tsx';
// import VehiculoPage from './src/components/vehiculo.tsx';
import AuthLoadingScreen from './src/middleware/verifyToken.tsx';

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="Perfil" component={PerfilPage} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Calendario" component={CalendarioBody} options={{ headerShown: false }}/>
        <Stack.Screen name="AgregarCalendario" component={AgregarCalendario} />
        {/* <Stack.Screen name="Diagnosticos" component={DiagnosticoPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Vehiculos" component={VehiculoPage} options={{ headerShown: false }}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
