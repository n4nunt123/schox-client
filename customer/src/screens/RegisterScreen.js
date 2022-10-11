import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableHighlight,
  View, Pressable,
} from "react-native";
import { useState } from "react";
import logo from "../../assets/logo1.png";


export default function RegisterScreen({navigation}) {

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [childrenName, setChildrenName] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.container}
    >
      <Image source={logo} style={styles.logo} />

      <TextInput
        style={[styles.input, { marginTop: 50 }]}
        onChangeText={setFullName}
        value={fullName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Phone Number"
      />
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder="Address"
      />

      <TextInput
          style={styles.input}
          onChangeText={setChildrenName}
          value={childrenName}
          placeholder="Your children name"
      />
      <TouchableHighlight style={styles.submit} underlayColor="#fff">

        <Text style={styles.submitText}>Register</Text>
      </TouchableHighlight>

      <View style={styles.control}>
        <Text style={styles.desc}>Already have a account? </Text>
        <Pressable onPress={() => navigation.navigate("login")}>
          <Text style={[styles.desc, {color: 'white'}]}>Sign in</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
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
    width: '90%',
  },
  logo: {
    width: 130,
    height: 30,
    marginTop: 105,
  },
  desc: {
    color: "#a0acda",
    fontSize: 18,
  },
  submit: {
    borderRadius: 40,
    backgroundColor: "#a0acda",
    width: 80,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: '70%',
    marginTop: 10
  },
  submitText: {
    color: "#fff",
  },
  control: {
    flexDirection: "row",
    marginTop: 130,
    marginLeft: 70,
  },
});
