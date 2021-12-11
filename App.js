import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FindAddress from './FindAddress';
import Map from './Map';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator} from'@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FindAddress" component={FindAddress} />
        <Stack.Screen name="Map" component={Map} />
      </ Stack.Navigator>
    </NavigationContainer>
  );
};
