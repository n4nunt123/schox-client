import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";

export default function TopUp({ navigation }) {
  const [value, setValue] = useState("");

  const onSubmit = (value) => async () => {
    try {
      if (value < 100000 || !value) {
        Alert.alert("Alert", "Minimum Top up is Rp 100.000");
      } else {
        const id = new Date().getTime();
        const order = `${id}--testing`;

        const { data } = await axios({
          url: "https://23e3-202-80-215-137.ap.ngrok.io" + "/users/balances",
          method: "post",
          data: {
            order: order,
            gross: value,
          },
        });
        navigation.navigate("Midtrans", { url: data.redirect_url });
      }
    } catch (err) {
      Alert.alert("Alert", err);
    }
  };

  return (
    <View style={styles.containerPhoto}>
      <View style={styles.userView}>
        <View style={{ marginStart: 0 }}>
          <Text style={styles.hallo}>Enter Top up amount</Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        placeholder="Rp 0"
        keyboardType="numeric"
      />
      <StatusBar style="auto" />
      <TouchableOpacity t onPress={onSubmit(value)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPhoto: {
    flex: 1,
  },
  userView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  hallo: {
    color: "#2B377F",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 2,
    marginTop: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#2B377F",
    marginTop: 10,
    marginHorizontal: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
    textAlign: "center",
  },
});
