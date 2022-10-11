import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DriverScreen from "../screens/DriverScreen";
import ChatScreen from '../screens/ChatScreen'

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Driver">
      <Stack.Screen
        name="DriverScreen"
        component={DriverScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
