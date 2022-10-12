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