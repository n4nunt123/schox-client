import { useState, useEffect } from "react";
import { socketInstance } from '../socket/socket'
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import * as React from "react";
import profile from "../../assets/icon/SeekPng.com_profile-icon-png_9665493.png";
import arrow from "../../assets/icon/arrow.png";
import dot from "../../assets/icon/dot.png";
import arrive from "../../assets/icon/arrive.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {baseUrl} from "../constants/baseUrl";
import {useFocusEffect} from "@react-navigation/native";

export default function DriverScreen({navigation}) {
  const [driver, setDriver] = useState({})
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      let value = JSON.parse(jsonValue)
      await detailDriver(value?.id, value?.access_token)
    } catch(e) {
      console.log(e)
    }
  }
  const detailDriver = async (id, token) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/users/" + id,
        method: "GET",
        headers: { access_token: token }
      })
      setDriver(data.driver)
    } catch (e) {
      console.log(e)
    }
  }
  useFocusEffect(
      React.useCallback(() => {
        getData()
      }, [])
  )

  const [emit, useEmit] = useState('')
  const [socket, setSocket] = useState('')
  let count = 0
  // untuk log, test update socket
  // useEffect(() => {
  //   console.log(socket)
  // }, [socket])

  const sendInterval = () => {
    count++
    socketInstance.emit('send:interval', count)
  }

  const start = () => {
    useEmit(setInterval(() => {
      sendInterval()
    }, 2000))
  }

  const stop = () => {
    clearInterval(emit)
    useEmit('')
    setSocket('')
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View style={styles.profile}>
        <Image source={{uri: `${driver.imgUrl}`}} style={styles.profileIcon} />
        <Text style={styles.name}>{driver.fullName}</Text>
        <Text style={styles.license}>{driver.phoneNumber}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>Vehicle Information</Text>
        <Image source={{uri: `${driver.carImgUrl}`}} style={styles.arrowIcon} />
        <Text style={styles.cartype}>{driver.carType}</Text>
        <Text style={styles.license}>Police Number : {driver.carLicenseNumber}</Text>

      </View>

      <Pressable style={styles.control} onPress={() => navigation.navigate('Chat')}>
        <View style={styles.chatBox}>
          <Text style={styles.chat}>CHAT</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
  profileIcon: {
    width: 140,
    height: 140,
    borderRadius: 20
  },
  name: {
    color: "#0d155a",
    fontSize: 22,
  },
  cartype: {
    color: "#999999",
    fontSize: 12,
  },
  license: {
    color: "#999999",
    fontSize: 12,
    marginBottom: 50
  },
  detail: {
    flexDirection: "row",
  },
  arrowIcon: {
    width: 180,
    height: 120,
  },
  description: {
    fontWeight: "100",
    fontSize: 10,
    color: "#8f90a8",
  },
  title: {
    color: "#0d155a",
    fontSize: 17,
    marginBottom: 10,
  },
  details: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center"
  },

  lastChild: {
    marginBottom: 7,
  },
  control: {
    flex: 1,
  },
  chat: {
    color: "#0d155a",
    marginTop: 7,
    fontSize: 25,
    alignItems: "center",
    alignContent: "center",
  },
  chatBox: {
    alignItems: "center",
    alignContent: "center",
    borderColor: "#0d155a",
    borderWidth: 2,
    borderRadius: 30,
    height: 50,
    width: 300,
  },
});
