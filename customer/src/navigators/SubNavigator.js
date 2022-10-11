import * as React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useFocusEffect} from "@react-navigation/native";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {baseUrl} from "../constants/baseUrl";
import SubsScreen from "../screens/SubsScreen";
import SubChildNavigator from "./SubChildNavigator";

const Stack = createNativeStackNavigator();

export default function SubscriptionNavigator() {
    const [detail, setDetail] = useState({})
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            let value = JSON.parse(jsonValue)
            await detailCustomer(value?.id, value?.access_token)
        } catch(e) {
            console.log(e)
        }
    }
    const detailCustomer = async (id, token) => {
        try {
            const { data } = await axios({
                url: baseUrl + "/users/" + id,
                method: "GET",
                headers: { access_token: token }
            })
            setDetail(data.user)
        } catch (e) {
            console.log(e)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getData()
        }, [])
    )
    return (
        <Stack.Navigator initialRouteName="Subcription">
            {detail.SubscriptionId === null ? <Stack.Screen
                name="SubChildNavigator"
                component={SubChildNavigator}
                options={{headerShown: false}}
            /> : <Stack.Screen
                name="SubsScreen"
                component={SubsScreen}
                options={{headerShown: false}}
            />}
        </Stack.Navigator>
    )
}