import * as React from "react";
import { StyleSheet} from 'react-native';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Image } from "react-native";
import HomeNavigator from "./HomeNavigator";
import SubscriptionNavigator from "./SubNavigator";
import ProfileNavigator from "./ProfileNavigator";
import {useEffect} from "react";

const Tab = createBottomTabNavigator();

export default function HomeTab({navigation}) {
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            let value = JSON.parse(jsonValue)
            if (!value) navigation.navigate("login")
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
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
                                        ? require("../../assets/icon/homeIcon1.png")
                                        : require("../../assets/icon/homeIcon2.png")
                                    : route.name == "Profile"
                                        ? focused
                                            ? require("../../assets/icon/profIcon1.png")
                                            : require("../../assets/icon/profIcon2.png")
                                        : route.name == "Subscription"
                                            ? focused
                                                ? require("../../assets/icon/subsIcon1.png")
                                                : require("../../assets/icon/subsIcon2.png")
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

