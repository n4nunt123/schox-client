import { Image, Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import * as Location from 'expo-location';
import { useState} from "react";
import * as React from 'react';
import {useFocusEffect} from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux"
import { getDataDriver } from "../store/actions/driverAction";


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
            setOrigin({longitude: location.coords.longitude, latitude: location.coords.latitude});
        } catch (e) {
            console.log(e)
        }
    }
    const getData = async () => {
        try {
            dispatch(getDataDriver())
            await mapRef.current.animateCamera({center: {"latitude":origin.latitude, "longitude": origin.longitude}})
        } catch(e) {
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
                    <View style={[{borderRadius: 30, alignItems: "center", justifyContent: "center", marginVertical: 10, padding: 5}, driver.driverStatus === "Available" ? {backgroundColor: 'green'} : {backgroundColor: 'grey'}]}>
                        <Text style={{color: "white"}}>{driver?.driverStatus === "Available" ? driver?.driverStatus : "Non Available"}</Text>
                    </View>
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