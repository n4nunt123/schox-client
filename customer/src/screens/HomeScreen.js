import { color } from "@rneui/base";
import {Button, Image, Pressable, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function HomeScreen({navigation}) {
    // pake conditional rendering
    // return (
    //     <View style={styles.container}>
    //         <View style={styles.userView}>
    //             <Image style={styles.iconProfl}
    //                    source={iconProfl}/>
    //             <View style={{marginStart: 15}}>
    //                 <Text style={styles.hallo}>Hallo, User!</Text>
    //                 <Text style={styles.date}>Kamis, 21 Januari 2022</Text>
    //             </View>
    //         </View>
    //         <View style={styles.mainCard}>
    //             <View style={styles.infoView}>
    //                 <Text style={styles.infoText}>Kamu belum{"\n"}ada subscription</Text>
    //             </View>
    //             <Image style={styles.iconSubs}
    //                    source={iconSubs}/>
    //             <View>
    //                 <Text style={styles.subsText}>Subscribe Now</Text>
    //             </View>
    //         </View>
    //         <StatusBar style="auto"/>
    //     </View>
    // )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topChild}>
                <View style={{flex: 1}}>
                    <Image source={require("../../assets/icon/SeekPng.com_profile-icon-png_9665493.png")} style={{width: 50, height: 50}} />
                </View>
                <View style={{flex: 4, flexDirection: "column"}}>
                    <Text style={{fontSize: 22, fontWeight: 'bold', color: '#2b377e'}}>Hello, User</Text>
                    <Text style={{color: "#a7a8c1"}}>10 October 2022</Text>
                </View>
            </View>
            <Pressable onPress={() => navigation.navigate('Trip')} style={styles.containerChild}>
                <Image source={require("../../assets/road.png")} style={{width: 100, height: 100}} />
                <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <Text style={styles.cardText}>Trip Status</Text>
                    <Text style={styles.tripStatus}>On the way</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Driver')} style={styles.containerChild}>
                <Image source={require("../../assets/driver.png")} style={{width: 100, height: 100}} />
                <Text style={styles.cardText}>Driver</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('School')} style={styles.containerChild}>
                <Image source={require("../../assets/school.png")} style={{width: 100, height: 100}} />
                <Text style={styles.cardText}>School</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEE8FF',
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 96
    },
    userView: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 75,
        marginBottom: 40
    },
    iconProfl: {
        width: 75,
        height: 75
    },
    hallo: {
        color: '#2B377F',
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 2,
        marginTop: 5
    },
    date: {
        color: '#999999',
        fontWeight: '600',
        fontSize: 13
    },
    mainCard: {
        width: '100%',
        height: 545,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    infoView: {
        height: 200,
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 20
    },
    infoText: {
        color: '#2B377F',
        fontWeight: '600',
        fontSize: 25,
        textAlign: 'center'
    },
    iconSubs: {
        width: 200,
        height: 200,
        marginBottom: 10
    },
    subsText: {
        color: '#2B377F',
        fontWeight: '600',
        fontSize: 17,
    },
    topChild: {
        flex: 0.6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    containerChild: {
        flex: 1,
        flexDirection: "row",
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 30
    },
    cardText: {
        fontSize: 32,
        marginHorizontal: 30,
        color: "#2D367F",
        fontWeight: "bold"
    },
    tripStatus: {marginTop: 10, color: "green", fontWeight: "bold", fontSize: 18, borderRadius: 30, borderWidth: 1, borderColor: "green", padding: 10}
});
