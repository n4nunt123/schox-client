import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import * as Location from 'expo-location';
import {useEffect, useState} from "react";

export default function HomeScreen({navigation}) {
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

    useEffect(() => {
        getLocation()
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => navigation.navigate('Profile')} style={styles.topCard}>
                <View style={{flex: 1}}>
                    <Image source={require("../../assets/profile.png")} style={{height: 80, width: 80}}/>
                </View>
                <View style={{flex: 4, flexDirection: "column", marginHorizontal: 50}}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Hello, Driver Name</Text>
                    <View style={{backgroundColor: 'green', borderRadius: 30, alignItems: "center", justifyContent: "center", marginVertical: 10, padding: 5}}>
                        <Text style={{color: "white"}}>Available</Text>
                    </View>
                </View>
            </Pressable>
            <View style={styles.bottomCard}>
                <MapView style={styles.map} provider={PROVIDER_GOOGLE} showsUserLocation={true} zoomControlEnabled={true} >
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