import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableHighlight,
} from "react-native";

import profile from "../../assets/icon/SeekPng.com_profile-icon-png_9665493.png";
import topUp from "../../assets/icon/wallet.png";
import logOut from "../../assets/icon/logOut.png";
import location from "../../assets/icon/location.png";

export default function ProfilePage({ navigation }) {
  return (
    <View style={styles.containerPhoto}>
      <View style={styles.userView}>
        <Image style={styles.profile} source={profile} />
        <View style={{ marginStart: 15 }}>
          <Text style={styles.hallo}>(Nama UserName)</Text>
          <Text style={styles.date}>(Nomor Telepon Username)</Text>
        </View>
      </View>

      <StatusBar style="auto" />
      <View style={styles.horizontalLine} />
      <View style={styles.containerMiddle}>
        <View style={styles.containerWallet}>
          <Text style={styles.infoText}>Rp 500.000</Text>
          <Text style={styles.infoMoney}>Balance</Text>
        </View>
        <View style={styles.verticleLine}></View>
        <View style={styles.containerSubsTime}>
          <Text style={styles.infoText}>3 November 2022</Text>
          <Text style={styles.infoMoney}>End Date</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.containerMenu}>
        <Pressable
          onPress={() => navigation.navigate("Top Up")}
          style={styles.menuRow}
        >
          <Image style={styles.menu} source={topUp} />
          <Text style={styles.textMenu}>Top Up</Text>
        </Pressable>
        <View style={styles.menuRow}>
          <Image style={styles.menu} source={location} />
          <Text style={styles.textMenu}>Address</Text>
        </View>
        <View style={styles.menuRow}>
          <Image style={styles.menu} source={logOut} />
          <Text style={styles.textMenu}>logOut</Text>
        </View>
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
