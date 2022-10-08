import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Feather } from "@expo/vector-icons";

import { Image } from "react-native";
import HomeNavigator from "./src/navigators/HomeNavigator";
import SubscriptionNavigator from "./src/navigators/SubNavigator";
import ProfileNavigator from "./src/navigators/ProfileNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        // screenOptions={({ route }) => ({
        //     tabBarIcon: ({ focused, color, size }) => {
        //         let iconName;
        //         if (route.name === "Home") {
        //             iconName = focused ? "home" : "home";
        //         } else if (route.name === "Subscription") {
        //             iconName = focused ? "zap" : "zap";
        //         } else if (route.name === "Profile") {
        //             iconName = focused ? "user" : "user";
        //         }
        //         return (
        //             <Feather
        //                 name={iconName}
        //                 size={28}
        //                 color={color}
        //             />
        //         );
        //     },
        //     tabBarActiveTintColor: "#f3a70a",
        //     tabBarInactiveTintColor: "black",
        // })}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarLabel: "Home",
            tabBarStyle: {
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
            },
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icon/homeIcon1.png")
                    : require("./assets/icon/homeIcon2.png")
                }
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: size,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Subscription"
          component={SubscriptionNavigator}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarLabel: "Home",
            tabBarStyle: {
              paddingTop: 7,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              borderLeftWidth: 0.2,
              borderRightWidth: 0.2,
              position: "absolute",
              overflow: "hidden",
              height: 90,
              borderTopWidth: 0,
              elevation: 0,
              shadowColor: "#000000",
            },
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icon/subsIcon1.png")
                    : require("./assets/icon/subsIcon2.png")
                }
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: size,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarLabel: "Home",
            tabBarStyle: {
              paddingTop: 7,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              borderLeftWidth: 0.2,
              borderRightWidth: 0.2,
              position: "absolute",
              overflow: "hidden",
              height: 90,
              borderTopWidth: 0,
              elevation: 0,
              shadowColor: "#000000",
            },
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icon/profIcon1.png")
                    : require("./assets/icon/profIcon2.png")
                }
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: size,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
