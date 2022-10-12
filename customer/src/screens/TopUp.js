import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import {baseUrl} from "../constants/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function TopUp({ navigation }) {
  const [value, setValue] = useState("");

  const onSubmit = (value) => async () => {
    try {

      if (value < 100000 || !value) {
        Alert.alert("Alert", "Minimum Top up is Rp 100.000");
      } else {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        let token = JSON.parse(jsonValue)

        const id = new Date().getTime();
        const order = `${id}--testing`;

        const { data } = await axios({
          url: baseUrl + "/users/topup",
          method: "post",
          data: {
            order: order,
            gross: value,
          },
          headers: { access_token: token?.access_token }
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
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          placeholder="Rp 0"
          keyboardType="numeric"
        />
      </View>
      <View style={{flexDirection: "row-reverse"}}>
      <Text style={styles.description}>Min Rp 100.000</Text>
      </View>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={onSubmit(value)}>
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
    padding: 10
  },
  userView: {
    width: "80%",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  hallo: {
    color: "#2B377F",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 2,
    marginTop: 5,
    paddingHorizontal: 35
  },
  inputcontainer: {
    width: '84%',
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#a0acda',
    width: '100%',
    marginLeft: 60
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
  description: {
    color: '#ec5f58',
    fontSize: 12,
    marginBottom: 10,
    paddingRight: 30,
    marginTop: 5
  }
});
