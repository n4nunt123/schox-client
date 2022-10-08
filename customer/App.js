import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeNavigator from './src/navigators/HomeNavigator';
import SubscriptionNavigator from './src/navigators/SubNavigator';
import ProfileNavigator from './src/navigators/ProfileNavigator'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeNavigator}
          options={{headerShown: false }}
        />
        <Tab.Screen 
          name="Subscription" 
          component={SubscriptionNavigator}
          options={{headerShown: false }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileNavigator}
          options={{headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}