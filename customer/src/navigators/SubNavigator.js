import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SubscriptionScreen from '../screens/ChooseSubscription';
import MidtransScreen from '../screens/MidtransScreen';

const Stack = createNativeStackNavigator();

export default function SubscriptionNavigator() {
  return (
    <Stack.Navigator initialRouteName="Subcription">
        <Stack.Screen 
          name="SubcriptionScreen" 
          component={SubscriptionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Midtrans" 
          component={MidtransScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
  )
}