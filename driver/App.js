import {StatusBar, StyleSheet, Text, View, TextInput, Button, Pressable, Image} from 'react-native';
import { Feather } from "@expo/vector-icons";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ChatScreen from "./src/screens/ChatScreen";
import { SafeAreaView } from 'react-native-safe-area-context';
import {useState} from "react";

const Tab = createBottomTabNavigator();
export default function App() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    return (

        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === "Home") {
                            iconName = focused ? "home" : "home";
                        } else if (route.name === "Profile") {
                            iconName = focused ? "user" : "user";
                        } else if (route.name === "Chat") {
                            iconName = focused ? "message-circle" : "message-circle";
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
                    tabBarInactiveTintColor: "#2C367D",
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{headerShown: false}}
                />
                <Tab.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{headerShown: false}}
                />
            </Tab.Navigator>
        </NavigationContainer>


        // <SafeAreaView style={styles.container}>
        //     <View style={styles.card}>
        //         <Image source={require("./assets/logo.png")} style={styles.logo} />
        //         <TextInput style={styles.input} onChangeText={setLoginForm.email} value={loginForm.email} />
        //         <TextInput style={styles.input} onChangeText={setLoginForm.password} value={loginForm.password} />
        //         <Pressable onPress={() => console.log("Klik aku mazzzz")} style={styles.button}>
        //             <Text>Login</Text>
        //         </Pressable>
        //     </View>
        //     <StatusBar style="auto" />
        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B367E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: "#E9EAEF",
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 300,
        borderRadius: 30
    },
    input: {
        height: 35,
        width: '80%',
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        height: 35,
        width: '80%',
        backgroundColor: '#F0CF00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 40,
        marginBottom: 20
    }
});
