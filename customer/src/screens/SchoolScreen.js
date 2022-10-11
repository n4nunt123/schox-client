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
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <Image source={schools} style={styles.icon}/>
      <Text style={styles.name}>{school.name}</Text>
      <Text style={styles.address}>{school.address}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 200,
    height: 200,
    marginTop: 140
  },
  name: {
    color: '#0d155a',
    fontWeight: 'bold',
    fontSize: 20,
  },
  address: {
    color: '#7182c5'
  }
})