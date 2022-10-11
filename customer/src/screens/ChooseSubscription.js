import {Alert, Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";

import { baseUrl } from "../constants/baseUrl";

export default function SubscriptionScreen({navigation}) {
    const [flag, useFlag] = useState(false)
    const [detail, setDetail] = useState({})

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            let value = JSON.parse(jsonValue)
            await detailCustomer(value?.id, value?.access_token)
        } catch (e) {
            console.log(e)
        }
    }
    const detailCustomer = async (id, token) => {
        try {
            const {data} = await axios({
                url: baseUrl + "/users/" + id,
                method: "GET",
                headers: {access_token: token}
            })
            setDetail(data)
        } catch (e) {
            console.log(e)
        }
    }
    const weekly = () => {
        useFlag(true)
    }
    const monthly = () => {
        useFlag(false)
    }
    const renderWeekly = () => {
        return (
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <View style={styles.price}>
                    <Text style={styles.rp}>Rp</Text>
                    <Text style={{fontSize: 32, fontWeight: "bold", color: '#212a72'}}>300.000</Text>
                    <Text style={styles.time}>/week</Text>
                </View>
                <Image style={{width: 200, height: 200, marginVertical: 20}}
                       source={require("../../assets/icon/Subscribe.png")}/>
                <TouchableHighlight style={styles.subs} onPress={() => {
                    if (detail.balance < 300000) {
                        Alert.alert("Opps!", "Your balance is insufficient");
                        navigation.navigate('Profile')
                    } else {
                        // logic ngurangin balance
                    }
                }}>
                    <Text style={{color: "white", fontSize: 14}}>Subscribe Now</Text>
                </TouchableHighlight>
            </View>
        )
    }
    const renderMonthly = () => {
        return (
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <View style={[styles.price]}>
                    <Text style={styles.rp}>Rp</Text>
                    <Text style={{fontSize: 32, fontWeight: "bold", color: '#212a72'}}>1.000.000</Text>
                    <Text style={styles.time}>/month</Text>
                </View>
                <Image style={{width: 200, height: 200, marginVertical: 20}}
                       source={require("../../assets/icon/Subscribe.png")}/>
                <TouchableHighlight style={styles.subs} onPress={() => {
                    if (detail.balance < 1000000) {
                        Alert.alert("Opps!", "Your balance is insufficient");
                        navigation.navigate('Profile')
                    } else {
                        // logic ngurangin balance
                    }
                }}>
                    <Text style={{color: "white", fontSize: 14, fontWeight: 'bold'}}>Subscribe Now</Text>
                </TouchableHighlight>
            </View>
        )
    }

    useFocusEffect(
        React.useCallback(() => {
            getData()
        }, [])
    )
    return (
        <View style={styles.top}>
            <Text style={{
                color: "white",
                fontSize: 28,
                paddingTop: 50,
                fontWeight: "bold",
                marginLeft: 15
            }}>Subscription</Text>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                    <TouchableHighlight style={styles.subtype} onPress={weekly}>
                        <Text style={{color: "white", fontSize: 20}}>Weekly</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.subtype} onPress={monthly}>
                        <Text style={{color: "white", fontSize: 20}}>Monthly</Text>
                    </TouchableHighlight>
                </View>
                <View style={{flex: 1}}>
                    {flag ? renderWeekly() : renderMonthly()}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {flex: 1, backgroundColor: "#2b377e"},
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: "100%",
        marginTop: 50,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        paddingTop: 20
    },
    subtype: {
        backgroundColor: "#2D367F",
        width: 170,
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 30,
        marginHorizontal: 5,
    },
    time: {
        marginTop: 10,
        color: "#9799b4"
    },
    price: {
        width: 280,
        height: 80,
        borderWidth: 2,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: "center",
        borderColor: "#2D367F",
        flexDirection: 'row',
        marginBottom: 50
    },
    rp: {
        marginBottom: 20,
        marginRight: 5,
        color: '#212a72'
    },
    subs: {
        backgroundColor: "#2D367F",
        width: 140,
        height: 40,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 30,
        marginHorizontal: 5
    }
})