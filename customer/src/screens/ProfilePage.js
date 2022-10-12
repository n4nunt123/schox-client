import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import profile from "../../assets/icon/SeekPng.com_profile-icon-png_9665493.png";
import topUp from "../../assets/icon/wallet.png";
import logOut from "../../assets/icon/logOut.png";
import location from "../../assets/icon/location.png";
import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import moment from "moment/moment";

import { useDispatch, useSelector } from "react-redux"
import { getDataUser } from "../store/actions/userAction";

export default function ProfilePage({ navigation }) {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => {
      return state.userReducer
  })

  useFocusEffect(
  React.useCallback(() => {
      dispatch(getDataUser())
  }, [])
  );

  const date = moment(user.Subscription?.endDate).format('MMMM D, YYYY')

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.containerPhoto}>
      <View style={styles.userView}>
        <Image style={styles.profile} source={profile} />
        <View style={{ marginStart: 15 }}>
          <Text style={styles.hallo}>{user?.fullName}</Text>
          <Text style={styles.date}>{user?.phoneNumber}</Text>
        </View>
      </View>

      <StatusBar style="auto" />
      <View style={styles.horizontalLine} />
      <View style={styles.containerMiddle}>
        <View style={styles.containerWallet}>
          <Text style={styles.infoText}>
            Rp. {user.balance?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </Text>
          <Text style={styles.infoMoney}>Balance</Text>
        </View>
        <View style={styles.verticleLine}></View>
        {!user.SubscriptionId ? <View style={styles.containerSubsTime}>
          <Text style={styles.infoText}>No subscription</Text>
        </View> : <View style={styles.containerSubsTime}>
          <Text style={styles.infoText}>{date}</Text>
          <Text style={styles.infoMoney}>End Date</Text>
        </View>}
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.containerMenu}>
        <Pressable
          onPress={() => navigation.navigate("TopUp")}
          style={styles.menuRow}
        >
          <Image style={styles.menu} source={topUp} />
          <Text style={styles.textMenu}>Top Up</Text>
        </Pressable>
        <View style={styles.menuRow}>
          <Image style={styles.menu} source={location} />
          <Text style={styles.textMenu}>{user.address}</Text>
        </View>
        <Pressable onPress={() => logout()} style={styles.menuRow}>
          <Image style={styles.menu} source={logOut} />
          <Text style={[styles.textMenu, { color: "#ee5d6b" }]}>logOut</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPhoto: {
    flex: 1,
  },
  containerMiddle: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
  },
  containerWallet: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  containerSubsTime: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  containerMenu: {
    flex: 4,
    backgroundColor: "white",
  },
  horizontalLine: {
    borderBottomColor: "#A8A8A8",
    borderBottomWidth: 1,
  },
  userView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  profile: {
    width: 75,
    height: 75,
  },
  menu: {
    width: 30,
    height: 30,
  },
  hallo: {
    color: "#2B377F",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 2,
    marginTop: 5,
  },
  date: {
    color: "#999999",
    fontWeight: "600",
    fontSize: 13,
  },
  infoText: {
    color: "#2B377F",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  infoMoney: {
    color: "#2B377F",
    fontWeight: "400",
    fontSize: 13,
    textAlign: "center",
  },
  subsText: {
    color: "#2B377F",
    fontWeight: "600",
    fontSize: 17,
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#A8A8A8",
  },
  textMenu: {
    color: "#2B377F",
    fontWeight: "400",
    fontSize: 20,
    marginLeft: 10,
  },
  menuRow: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
