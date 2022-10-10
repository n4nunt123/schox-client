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

  const style = {
    paddingTop: 7,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    position: "absolute",
    overflow: "hidden",
    height: 90,
    elevation: 0,
    shadowColor: "#000000",
    borderTopWidth: 0,
    display: "flex"
  };

  if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  } else {
    navigation.setOptions({ tabBarStyle: style });
  }

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          
        }}
      />
      <Stack.Screen
        name="Trip"
        component={TripScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Driver"
        component={DriverScreen}
        options={{headerShadowVisible: false}}
      />
      <Stack.Screen
        name="School"
        component={SchoolScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
