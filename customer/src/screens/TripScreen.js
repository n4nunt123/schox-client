import { StyleSheet, Text, View } from "react-native";
import { socketInstance } from "../socket/socket";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const mapRef = React.createRef();
export default function TripScreen() {
    const [driverCoordinate, setDriverCoordinate] = useState({});
    const [myLocation, setMyLocation] = useState({});

    socketInstance.on("recieve:interval", (data) => {
        setDriverCoordinate(data);
    });

    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
                enableHighAccuracy: true,
                timeInterval: 5,
            });
            await mapRef.current.animateCamera({
                center: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
            });

            setMyLocation({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
      getLocation();
    }, [])
    console.log(myLocation);
    return (
        <View style={styles.container}>
            <Text>TRIP SCREEN</Text>
            {/* <Text>{JSON.stringify(driverCoordinate)}</Text> */}
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DEE9FF",
    },
    map: {
        height: 500,
        width: "95%",
        marginTop: 80
    },
});
