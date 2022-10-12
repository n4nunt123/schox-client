import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfilePage from "../screens/ProfilePage";
import MidtransScreen from "../screens/MidtransScreen";
import TopUpScreen from "../screens/TopUp";

const Stack = createNativeStackNavigator();
export default function SubscriptionNavigator() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopUp"
        component={TopUpScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Midtrans"
        component={MidtransScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
