import { Image, Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import * as Location from 'expo-location';
import { useState} from "react";
import * as React from 'react';
import {useFocusEffect} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"
import { getDataDriver } from "../store/actions/driverAction";
import {baseUrl} from "../constants/baseUrl";
import moment from "moment";

const mapRef = React.createRef();
export default function HomeScreen({navigation, route}) {
    const dispatch = useDispatch()
    const { driver } = useSelector((state) => {
        return state.driverReducer
    })

    const [origin, setOrigin] = useState({
        longitude: 0,
        latitude: 0
    })

    const [detail, setDetail] = useState({})
    const [isBooked, setIsBooked] = useState(null)
    const [endDate, setEndDate] = useState("")
    const date = moment(endDate).format('MMMM D, YYYY')


    const getLocation = async() => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
                enableHighAccuracy: true,
                timeInterval: 5
            });
            await mapRef.current.animateCamera({center: {"latitude":location.coords.latitude, "longitude": location.coords.longitude}})

            setOrigin({longitude: location.coords.longitude, latitude: location.coords.latitude});
        } catch (e) {
            console.log(e)
        }
    }
    const getData = async () => {
        try {
            dispatch(getDataDriver())
            await mapRef.current.animateCamera({center: {"latitude":origin.latitude, "longitude": origin.longitude}})
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            let value = JSON.parse(jsonValue)
            await checkStatus(value?.id)
        } catch(e) {
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
                setEndDate(data.subsDetail.endDate)
            } else {
                setIsBooked(null)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const checkSubs = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            let value = JSON.parse(jsonValue)
            if (moment(endDate).format('MMMM D, YYYY') === moment().format('MMMM D, YYYY')) {
                const {data} = await axios({
                    url: baseUrl + "/drivers/subscriptions/" + value.id,
                    method: "DELETE"
                })
                console.log(data, "<<<")
            } else {
                console.log("belum habis")
            }
        } catch (e) {
            console.log(e)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getData()
            getLocation()
        }, [])
    )
    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => {
                navigation.navigate('Profile')
            }} style={styles.topCard}>
                <View style={{flex: 1, marginLeft: 20}}>
                    <Image source={{uri: `${driver?.imgUrl}`}} style={{height: 80, width: 80, borderRadius: 50}}/>
                </View>
                <View style={{flex: 4, flexDirection: "column", marginHorizontal: 30, paddingLeft: 30}}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Hello, {driver?.fullName}</Text>
                    {!isBooked ?
                        <View style={[{borderRadius: 30, alignItems: "center", justifyContent: "center", marginVertical: 10, padding: 5}, detail.driverStatus === "Available" ? {backgroundColor: 'green'} : {backgroundColor: 'grey'}]}>
                            <Text style={{color: "white"}}>{driver?.driverStatus === "Available" ? driver?.driverStatus : "Non Available"}</Text>
                        </View>
                        :
                        <View style={[{borderRadius: 10, alignItems: "center", justifyContent: "center", marginVertical: 10, padding: 5}, detail.driverStatus === "BOOKED" ? {backgroundColor: 'lightgreen'} : null]}>
                            <Text style={{color: "white"}}>You are booked until</Text>
                            <Text style={{color: "white", fontWeight: "bold"}}>{endDate ? date : null}</Text>
                        </View>
                    }
                </View>
            </Pressable>
            <View style={styles.bottomCard}>
                <MapView ref={mapRef} style={styles.map} provider={PROVIDER_GOOGLE} showsUserLocation={true} zoomControlEnabled={true} >
                    <Marker
                        coordinate={{latitude: origin.latitude,
                            longitude: origin.longitude}}
                        pinColor={'red'}
                        title={'Origin'}
                    />
                </MapView>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        backgroundColor: "white",
        borderRadius: 30,
        margin: 30,
        padding: 20
    },
    bottomCard: {
        overflow: "hidden",
        flex: 4,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        backgroundColor: "white",
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderWidth: 1,
        borderColor: "white"
    },
    map: {
        height: "100%",
        width: "100%",
    }
})