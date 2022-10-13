import { StyleSheet, Text, View } from "react-native";
import { socketInstance } from "../socket/socket";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import * as React from "react";

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

            setMyLocation(location.coords);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
      getLocation();
    }, [])
    // console.log(driverCoordinate);
    return (
        <View style={styles.container}>
            {/* <Text>{JSON.stringify(driverCoordinate)}</Text> */}
            <View style={styles.cardTop}>
                <Text>STATUS:  pick up</Text>
            </View>
            <View style={styles.cardBottom}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    minZoomLevel={12}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    zoomControlEnabled={true}
                    initialRegion={{
                        latitude: -6.200000,
                        longitude: 106.816666,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {myLocation.latitude &&
                        <Marker coordinate={myLocation} title={"My Location"}/>
                    }
                    {driverCoordinate.latitude &&
                        <Marker coordinate={driverCoordinate} title={"Driver Location"} pinColor={"blue"}/>
                    }
                    {driverCoordinate.latitude !== null &&
                        <MapViewDirections
                            origin={driverCoordinate}
                            destination={myLocation}
                            apikey={"AIzaSyArgl6qu_3u4Ub5rLzrlQ5YQ3oeOIrrWdE"}
                            strokeWidth={4}
                            strokeColor="red"
                        />
                    }

                </MapView>
            </View>
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
    cardTop: {
        width: '90%',
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 20,
        marginVertical: 20
    },
    cardBottom: {
        overflow: "hidden",
        flex: 3,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        backgroundColor: "white",
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderWidth: 1,
        borderColor: "white",

    },
    map: {
        height: "100%",
        width: "100%",
    },
});
