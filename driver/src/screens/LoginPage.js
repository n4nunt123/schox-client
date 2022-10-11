import {SafeAreaView} from "react-native-safe-area-context";
import {
    Image,
    StatusBar,
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableHighlight,
    Alert,
    BackHandler,
} from "react-native";
import {useEffect, useState} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? navigation.navigate("Home") : null;
        } catch(e) {
            console.log(e)
        }
    }
    const login = async () => {
        try {
            const { data } = await axios({
                url: "https://5299-2001-448a-2040-44a9-c6e-79a9-fa8a-6fc1.ap.ngrok.io/drivers/login",
                method: "POST",
                data: {email, password}
            })
            await storeData({id: data.id})
            navigation.navigate({
                name: "Home",
                params: {id: data.id}
            })
        } catch (e) {
            console.log(e)
        }
    }

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    useEffect(() => {
        getData()
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
                <TextInput style={styles.input} onChangeText={setEmail} value={email} />
                <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry={true} />
                <TouchableHighlight onPress={() => login()} style={styles.button}>
                    <Text>Login</Text>
                </TouchableHighlight>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B367E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 35,
        width: '80%',
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    logo: {
        width: 100,
        height: 40,
        marginBottom: 20
    },
    card: {
        backgroundColor: "#E9EAEF",
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 300,
        borderRadius: 30
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        height: 35,
        width: '80%',
        backgroundColor: '#F0CF00',
        alignItems: 'center',
        justifyContent: 'center',
    },
})