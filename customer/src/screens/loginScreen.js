import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import logo from "../../assets/logo1.png";

export default function RegisterScreen() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.container}
    >
      <Image source={logo} style={styles.logo} />
      <Text style={styles.desc}>Please Sign in to continue</Text>

      <TextInput
        style={[styles.input, { marginTop: 50 }]}
        onChangeText={setRegisterForm.email}
        value={registerForm.email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setRegisterForm.password}
        value={registerForm.password}
        placeholder="Passoword"
      />
      <TouchableHighlight style={styles.submit} underlayColor="#fff">
        <Text style={styles.submitText}>Login</Text>
      </TouchableHighlight>

      <StatusBar style="auto" />

      <View style={styles.control}>
        <Text style={styles.desc}>Don't have an account? </Text>
        <Text style={[styles.desc, {color: 'white'}]}>Sign Up</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 20,
  },
  form: {
    flex: 1,
    width: "90%",
    height: "100%",
    marginTop: 20,
  },
  input: {
    height: 45,
    margin: 12,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 30,
    width: 380,
  },
  logo: {
    width: 130,
    height: 30,
    marginTop: 220,
  },
  desc: {
    color: "#a0acda",
    fontSize: 18,
  },
  submit: {
    borderRadius: 40,
    backgroundColor: "#a0acda",
    width: 100,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: "#a0acda",
    marginLeft: 290,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
  },
  control: {
    flexDirection: 'row',
    marginTop: 200,
    marginLeft: 70
  }
});
