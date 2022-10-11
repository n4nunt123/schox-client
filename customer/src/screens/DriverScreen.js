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

export default function DriverScreen() {
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
        <Text style={styles.license}>{driver.carLicenseNumber}</Text>
      </View>

      <View>
        <Text style={styles.title}>Detail Perjalanan</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detail}>
          <Image source={arrow} style={styles.arrowIcon} />
          <View>
            <Text style={styles.description}>Lokasi jemput</Text>
            <Text style={{ color: "#0d155a" }}>
              Jalan Mangga 2, lewatin rumput
            </Text>
          </View>
        </View>
        <Image source={dot} style={styles.dotIcon} />
        <Image source={dot} style={styles.dotIcon} />
        <Image source={dot} style={[styles.dotIcon, styles.lastChild]} />
        <View style={styles.detail}>
          <Image source={arrive} style={styles.arrowIcon} />
          <View>
            <Text style={styles.description}>Lokasi jemput</Text>
            <Text style={{ color: "#0d155a" }}>
              Jalan Jeruk 5, lewatin macan
            </Text>
          </View>
        </View>
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
    marginTop: 25,
    alignItems: "center",
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 20
  },
  name: {
    color: "#0d155a",
    fontSize: 22,
  },
  license: {
    color: "#999999",
    fontSize: 12,
  },
  detail: {
    flexDirection: "row",
  },
  arrowIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  description: {
    fontWeight: "100",
    fontSize: 10,
    color: "#8f90a8",
  },
  title: {
    color: "#0d155a",
    fontSize: 17,
    marginBottom: 30,
  },
  details: {
    flex: 1.5,
  },
  dot: {
    color: "#72769f",
    padding: 10,
  },
  dotIcon: {
    width: 10,
    height: 10,
    marginLeft: 10,
    marginTop: 7,
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
