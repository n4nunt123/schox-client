import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";

export default function App() {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: "",
    password: "",
    phoneNumber: "",
    address: ""
  })
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>
        <Text>Full Name</Text>
        <TextInput style={styles.input} onChangeText={setRegisterForm.name} value={registerForm.name}  />

        <Text>Email Address</Text>
        <TextInput style={styles.input} onChangeText={setRegisterForm.email} value={registerForm.email}  />

        <Text>Password</Text>
        <TextInput style={styles.input} onChangeText={setRegisterForm.password} value={registerForm.password}  />

        <Text>Phone Number</Text>
        <TextInput style={styles.input} onChangeText={setRegisterForm.phoneNumber} value={registerForm.phoneNumber}  />

        <Text>Address</Text>
        <TextInput style={styles.input} onChangeText={setRegisterForm.address} value={registerForm.address}  />

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    width: '90%',
    height: '100%',
    marginTop: 20
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
