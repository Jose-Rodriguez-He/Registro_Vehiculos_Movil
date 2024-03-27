import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/components/login.tsx';
import LandingPage from './src/components/landingPage.tsx';
import Perfil from  './src/components/pages/perfil/perfil.tsx';
import CalendarioBody from './src/components/pages/calendario/calendario.tsx';
import AgregarCalendario from './src/components/pages/calendario/AgregarCalendario.tsx';
import EditarCalendario from './src/components/pages/calendario/EditarCalendario.tsx';


import Vehiculos from './src/components/pages/vehiculos/vehiculos.tsx';
import AgregarVehiculo from './src/components/pages/vehiculos/AgregarVehiculo.tsx';
import EditarVehiculo from './src/components/pages/vehiculos/EditarVehiculo.tsx'
import AuthLoadingScreen from './src/middleware/verifyToken.tsx';

import Diagnosticos from './src/components/pages/diagnostico/diagnostico.tsx';
import AgregarDiagnostico from './src/components/pages/diagnostico/AgregarDiagnostico.tsx';
import EditarDiagnostico from './src/components/pages/diagnostico/EditarDiagnostico.tsx';

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
        <Stack.Screen name="Calendario" component={CalendarioBody} options={{ headerShown: false }}/>
        <Stack.Screen name="AgregarCalendario" component={AgregarCalendario} options={{ headerShown: false }}/>
        <Stack.Screen name="EditarCalendario" component={EditarCalendario}/>
        
        {/* Stack para vehiculos */}
        <Stack.Screen name="Vehiculos" component={Vehiculos} options={{ headerShown: false }}/>
        <Stack.Screen name="AgregarVehiculo" component={AgregarVehiculo}/>
        <Stack.Screen name="EditarVehiculo" component={EditarVehiculo}/>

        {/* Stack para diagnosticos */}
        <Stack.Screen name="Diagnosticos" component={Diagnosticos} options={{ headerShown: false }}/>
        <Stack.Screen name="AgregarDiagnostico" component={AgregarDiagnostico}/>
        <Stack.Screen name="EditarDiagnostico" component={EditarDiagnostico}/>
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
