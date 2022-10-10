import * as React from "react";
import { StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Feather } from "@expo/vector-icons";

import { Image } from "react-native";
import HomeNavigator from "./src/navigators/HomeNavigator";
import SubscriptionNavigator from "./src/navigators/SubNavigator";
import ProfileNavigator from "./src/navigators/ProfileNavigator";

import { Provider } from "react-redux";
import store from './src/store/store'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarLabel: "Home",
            tabBarStyle: styles.showTabStyles,
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  route.name == "Home"
                    ? focused
                      ? require("./assets/icon/homeIcon1.png")
                      : require("./assets/icon/homeIcon2.png")
                    : route.name == "Profile"
                    ? focused
                      ? require("./assets/icon/subsIcon1.png")
                      : require("./assets/icon/subsIcon2.png")
                    : route.name == "Subscription"
                    ? focused
                      ? require("./assets/icon/profIcon1.png")
                      : require("./assets/icon/profIcon2.png")
                    : ""
                }
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: size,
                }}
              />
            ),
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeNavigator}
            options={({ route }) => ({
              tabBarStyle: (route => {
              const routeName = getFocusedRouteNameFromRoute(route)
                switch (routeName) {
                  case 'Trip':
                  case 'Driver':
                  case 'School':
                    return styles.hideTabStyles
                  default:
                    return styles.showTabStyles
                }
              })(route),
            })}
          />
          <Tab.Screen name="Subscription" component={SubscriptionNavigator} />
          <Tab.Screen name="Profile" component={ProfileNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  showTabStyles: {
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
    display: "flex"
  },
  hideTabStyles: {
    display: "none"
  }
})

