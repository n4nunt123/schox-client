import {Text, View, StyleSheet, Image, Modal, Pressable, ScrollView, TouchableHighlight} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import * as React from "react";

export default function ProfileScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState("Available");
    const [detail, setDetail] = useState({})

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
        } catch(e) {
            console.log(e)
        }
    }
    const detailDriver = async (id) => {
        try {
            const { data } = await axios({
                url: "https://5299-2001-448a-2040-44a9-c6e-79a9-fa8a-6fc1.ap.ngrok.io/drivers/" + id,
                method: "GET"
            })
            setDetail(data)
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
                    <Image source={{uri: `${detail?.imgUrl}`}} style={{height: 80, width: 80, borderRadius: 50}} />
                    <Text style={styles.driverText}>Mr. {detail?.fullName}</Text>
                    <View style={{flexDirection: "row", width: "100%", justifyContent: "center"}}>
                        <TouchableHighlight style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                            <Text style={{color: "white"}}>{status}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => logout()} style={[styles.button,styles.buttonLogout]}>
                            <Text style={{color: "white"}}>Logout</Text>
                        </TouchableHighlight>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Picker
                                    style={{height:30, width:160}}
                                    selectedValue={status}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setStatus(itemValue)
                                        setModalVisible(!modalVisible)
                                    }
                                    }>
                                    <Picker.Item label="Available" value="Available" />
                                    <Picker.Item label="Not Available" value="Not Available" />
                                </Picker>
                            </View>
                        </View>
                    </Modal>
                </View>
                {/*  balance  */}
                <View style={styles.cardBalance}>
                    <Text style={styles.modalText}>Balance: Rp. {detail?.balance}</Text>
                </View>
                {/*  schedule  */}
                <View style={styles.cardSchedule}>
                    <ScrollView style={{width: "100%", height: "100%"}}>
                        <View style={styles.schedule}>
                            <Text>Schedule</Text>
                        </View>
                        <View style={styles.schedule}>
                            <Text>Schedule</Text>
                        </View>
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
        marginHorizontal: 5
    },
    buttonOpen: {
        backgroundColor: 'green',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonLogout: {
        backgroundColor: '#c70000',
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
        height: 200,
        backgroundColor: "#DEE9FF",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: "5%"
    }
})