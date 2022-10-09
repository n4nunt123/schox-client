import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import profile from "../../assets/icon/icon.png";
import topUp from "@";

export default function ProfilePage() {
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
          <Text style={styles.infoMoney}>Dompet</Text>
        </View>
        <View style={styles.verticleLine}></View>
        <View style={styles.containerSubsTime}>
          <Text style={styles.infoText}>3 November 2022</Text>
          <Text style={styles.infoMoney}>End Date</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.containerMenu}>
        <View style={styles.menuRow}>
          <MaterialCommunityIcons
            name="wallet-plus"
            size={40}
            color="#2B377F"
          />
          <Text style={styles.textMenu}>Top Up</Text>
        </View>
        <View style={styles.menuRow}>
          <Octicons name="location" size={40} color="#2B377F" />
          <Text style={styles.textMenu}>Address</Text>
        </View>
        <View style={styles.menuRow}>
          <SimpleLineIcons name="logout" size={40} color="black" />
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
    marginTop: 75,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  profile: {
    width: 75,
    height: 75,
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
