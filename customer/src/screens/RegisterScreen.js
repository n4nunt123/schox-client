import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableHighlight,
  View, Pressable, Alert,
} from "react-native";
import {useEffect, useState} from "react";
import logo from "../../assets/logo1.png";
import * as React from "react";
import axios from "axios";
import {baseUrl} from "../constants/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RegisterScreen({navigation, route}) {

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [childrenName, setChildrenName] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  const register = async () => {
    try {
      if (!latitude || !longitude) {
        Alert.alert("Opps!", "Please set your location first")
      }
      await axios({
        url: baseUrl + "/users/register",
        method: "post",
        data: {email, password, fullName, phoneNumber, address, childrenName, latitude, longitude}
      })

      const { data } = await axios({
        url: baseUrl + "/users/login",
        method: "POST",
        data: {email, password}
      })

      console.log(data, "<<< ini data")

      await storeData({id: data.id, access_token: data.access_token})
      navigation.navigate({
        name: "Home",
      })
    } catch (e) {
      console.log(e)
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  // const login = async () => {
  //   try {
  //     const { data } = await axios({
  //       url: baseUrl + "/users/login",
  //       method: "POST",
  //       data: {email, password}
  //     })
  //
  //     await storeData({id: data.id, access_token: data.access_token})
  //     navigation.navigate({
  //       name: "Home",
  //       params: {id: data.id, access_token: data.access_token}
  //     })
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    if (route.params?.coords) {
      // console.log(route.params?.coords, "<< di register")
      setLatitude(route.params?.coords.latitude)
      setLongitude(route.params?.coords.longitude)
    }
  }, [route.params?.coords])

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.container}
    >
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Image source={logo} style={styles.logo} />

        <TextInput
            style={[styles.input, { marginTop: 50 }]}
            onChangeText={setFullName}
            value={fullName}
            placeholder="Name"
        />
        <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
        />
        <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
        />
        <TextInput
            style={styles.input}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="Phone Number"
        />
        <TextInput
            style={styles.input}
            onChangeText={setChildrenName}
            value={childrenName}
            placeholder="Your children name"
        />
        <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Address"
        />
        <View style={{flexDirection: "row"}}>
          {!latitude ? <TouchableHighlight onPress={() => navigation.navigate("location")} style={styles.setLoc} underlayColor="#fff">
            <Text style={styles.submitText}>Set Location</Text>
          </TouchableHighlight> : <TouchableHighlight onPress={() => navigation.navigate("location")} style={styles.location} underlayColor="#fff">
            <Text style={styles.submitText}>Location Set!</Text>
          </TouchableHighlight>}
          <TouchableHighlight onPress={() => register()} style={styles.submit} underlayColor="#fff">
            <Text style={styles.submitText}>Register</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.control}>
          <Text style={styles.desc}>Already have a account? </Text>
          <Pressable onPress={() => navigation.navigate("login")}>
            <Text style={[styles.desc, {color: 'white'}]}>Sign in</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 20,
  },
  form: {
    flex: 1,
    width: "90%",
    height: "100%",
    marginTop: 20,
  },
  input: {
    height: 45,
    margin: 12,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 30,
    width: '90%',
  },
  logo: {
    width: 130,
    height: 30,
    marginTop: 105,
  },
  desc: {
    color: "#a0acda",
    fontSize: 18,
  },
  submit: {
    borderRadius: 40,
    backgroundColor: "#a0acda",
    width: 80,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 135,
    marginTop: 10
  },
  location: {
    borderRadius: 40,
    backgroundColor: "#28c500",
    width: 100,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginTop: 10
  },
  setLoc: {
    borderRadius: 40,
    backgroundColor: "#c50000",
    width: 100,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginTop: 10
  },
  submitText: {
    color: "#fff",
  },
  control: {
    flexDirection: "row",
    marginTop: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});
