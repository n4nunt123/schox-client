import { View, Text, Image, StyleSheet } from "react-native";
import schools from "../../assets/icon/school.png";
import {useFocusEffect} from "@react-navigation/native";
import * as React from "react";

import { useDispatch, useSelector } from "react-redux"
import { getDataUser } from "../store/actions/userAction";

export default function SchoolScreen() {
  const dispatch = useDispatch()
  const { school } = useSelector((state) => {
      return state.userReducer
  })

  useFocusEffect(
  React.useCallback(() => {
      dispatch(getDataUser())
  }, [])
  );
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