import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./Home";
import Login from "../screens/LoginPage";

const Stack = createNativeStackNavigator();
export default function RootStack () {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home" component={Home} options={{headerShown: false}} />
                <Stack.Screen name="login" component={Login} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}