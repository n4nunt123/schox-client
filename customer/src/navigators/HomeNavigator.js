import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeScreen from "../screens/HomeScreen";
import TripScreen from "../screens/TripScreen";
import DriverScreen from "../screens/DriverScreen";
import SchoolScreen from "../screens/SchoolScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator({ navigation, route }) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "Driver"){
        navigation.setOptions({tabBarVisible: false});
    }else {
        navigation.setOptions({tabBarVisible: true});
    }
}, [navigation, route]);
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
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Driver"
        component={DriverScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="School"
        component={SchoolScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
