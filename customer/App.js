import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from "@expo/vector-icons";
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
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Home") {
                    iconName = focused ? "home" : "home";
                } else if (route.name === "Subscription") {
                    iconName = focused ? "zap" : "zap";
                } else if (route.name === "Profile") {
                    iconName = focused ? "user" : "user";
                }
                return (
                    <Feather
                        name={iconName}
                        size={28}
                        color={color}
                    />
                );
            },
            tabBarActiveTintColor: "#f3a70a",
            tabBarInactiveTintColor: "black",
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