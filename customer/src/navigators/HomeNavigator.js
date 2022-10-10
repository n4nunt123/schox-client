import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import TripScreen from "../screens/TripScreen";
import DriverScreen from "../screens/DriverScreen";
import SchoolScreen from "../screens/SchoolScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator({ navigation, route }) {
  const tabHiddenRoutes = ["Driver", "Map"];

  if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
    navigation.setOptions({tabBarStyle: {display: 'none'}});
  } else {
    navigation.setOptions({tabBarStyle: {display: 'flex'}});
  }

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Trip"
        component={TripScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Driver"
        component={DriverScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="School"
        component={SchoolScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
