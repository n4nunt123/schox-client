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
        screenOptions={({ route }) => ({
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
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Subscription" component={SubscriptionNavigator} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
