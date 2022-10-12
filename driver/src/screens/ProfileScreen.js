import {Image, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import * as React from "react";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {baseUrl} from "../constants/baseUrl";


export default function ProfileScreen({navigation}) {
    const [status, setStatus] = useState("Available");
    const [detail, setDetail] = useState({})
    const [isBooked, setIsBooked] = useState(null)
    const [subsDetail, setSubsDetail] = useState({})
    const [userDetail, setUserDetail] = useState({})

    const logout = async () => {
        try {
            await AsyncStorage.clear()
            navigation.navigate("login")
        } catch (e) {
            console.log(e)
        }
    }
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            let value = JSON.parse(jsonValue)
            await detailDriver(value?.id)
            await checkStatus(value?.id)
        } catch (e) {
            console.log(e)
        }
    }
    const detailDriver = async (id) => {
        try {
            const {data} = await axios({
                url: baseUrl + "/drivers/" + id,
                method: "GET"
            })
            setDetail(data)
        } catch (e) {
            console.log(e)
        }
    }

    const checkStatus = async (id) => {
        try {
            const {data} = await axios({
                url: baseUrl + "/drivers/subscriptions/" + id,
                method: "GET",
            })
            if (data.message === "BOOKED") {
                setIsBooked("BOOKED")
                setSubsDetail(data.subsDetail)
                setUserDetail(data.user)
            } else {
                setIsBooked(null)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const updateStatus = async (value) => {
        try {
            const {data} = await axios({
                url: baseUrl + "/drivers/" + detail.id,
                method: "PATCH",
                data: {driverStatus: value}
            })
            console.log(data)
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
        <SafeAreaView style={styles.container}>
            <View style={styles.topCard}>
                <Text style={{fontWeight: "bold", fontSize: 24}}>Profile</Text>
            </View>
            <View style={styles.card}>
                {/* profile */}
                <View style={styles.cardProfile}>
                    <Image source={{uri: `${detail?.imgUrl}`}} style={{height: 80, width: 80, borderRadius: 50}}/>
                    <Text style={styles.driverText}>Mr. {detail?.fullName}</Text>
                    <View style={{flexDirection: "row", width: "100%", justifyContent: "center"}}>
                        {!isBooked && <View style={{
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#bdc3c7',
                            overflow: 'hidden',
                            justifyContent: "center",
                            alignItems: "center",
                            width: 160
                        }}>
                            <Picker
                                style={[styles.button, {height: 20, width: "100%"}]}
                                selectedValue={status}
                                onValueChange={(itemValue, itemIndex) => {
                                    setStatus(itemValue)
                                    updateStatus(itemValue)
                                }
                                }>
                                <Picker.Item label="Available" value="Available"/>
                                <Picker.Item label="Non Available" value="NonAvailable"/>
                            </Picker>
                        </View>}
                        <TouchableHighlight onPress={() => logout()} style={[styles.button, styles.buttonLogout]}>
                            <Text style={{color: "white"}}>Logout</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                {/*  balance  */}
                <View style={styles.cardBalance}>
                    <Text style={styles.modalText}>Balance: Rp. {detail.balance?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                </View>
                {/*  schedule  */}
                <View style={styles.cardSchedule}>
                    <ScrollView style={{width: "100%", height: "100%"}}>
                        {!isBooked ?
                            <View style={styles.noschedule}>
                                <Text style={{fontWeight: "bold", color: "grey"}}>Currently, you have no customer</Text>
                            </View> :
                            <>
                                <View style={styles.schedule}>
                                    <Text>To School: {subsDetail?.toShoolTime}</Text>
                                </View>
                                <View style={styles.schedule}>
                                    <Text>Back to home: {subsDetail?.goHomeTime}</Text>
                                </View>
                            </>
                        }
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DEE9FF"
    },
    topCard: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        flex: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
    },
    driverText: {
        marginVertical: 20,
        fontSize: 22,
        fontWeight: "bold"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 5,

    },
    buttonOpen: {
        backgroundColor: 'green',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonLogout: {
        backgroundColor: '#c70000',
        alignItems: "center",
        justifyContent: "center",
        width: 80
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontWeight: "bold"
    },
    cardProfile: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 70,
        width: "100%",
        height: "100%"
    },
    cardBalance: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 40,
    },
    cardSchedule: {
        flex: 4,
        width: "100%",
        height: "100%"
    },
    schedule: {
        height: 100,
        backgroundColor: "#DEE9FF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: "5%"
    },
    noschedule: {
        height: 200,
        // backgroundColor: "#DEE9FF",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: "5%"
    },
})