import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ErrorScreen,
  LoginScreen,
  RegistryScreen,
  SuccessScreen,
  WaitScreen,
} from './src/screens';
import AccountRoute from './src/screens/AccountRoute';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AccountRoute">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Error"
          component={ErrorScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Registry"
          component={RegistryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wait"
          component={WaitScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountRoute"
          component={AccountRoute}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
