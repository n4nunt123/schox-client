import { View, Text, Image, StyleSheet } from "react-native";
import schools from "../../assets/icon/school.png";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {baseUrl} from "../constants/baseUrl";
import {useFocusEffect} from "@react-navigation/native";
import * as React from "react";

export default function SchoolScreen() {
  const [school, setChool] = useState({})
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      let value = JSON.parse(jsonValue)
      await detailCustomer(value?.id, value?.access_token)
    } catch(e) {
      console.log(e)
    }
  }
  const detailCustomer = async (id, token) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/users/" + id,
        method: "GET",
        headers: { access_token: token }
      })
      setChool(data.school)
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: "center", backgroundColor: 'white' }}>
      <Image source={schools} style={styles.icon}/>
      <Text style={styles.name}>{school.name}</Text>
      <View style={styles.addressParent}>
        <Text style={styles.address}>{school.address}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 200,
    height: 200,
  },
  name: {
    color: '#0d155a',
    fontWeight: 'bold',
    fontSize: 20,
  },
  address: {
    color: '#7182c5',
    width: 300,
    textAlign: "center"
  },
  addressParent: {
    justifyContent: "center",
    alignItems: "center"
  }
})