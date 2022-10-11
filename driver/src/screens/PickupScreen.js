import { StyleSheet, Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from "react";
import { socketInstance } from '../socket/socket'
import * as Location from 'expo-location';

export default function ProfileScreen() {
  const [emit, setEmit] = useState('')
  const [status, setStatus] = useState('depart')
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longtitude: 0
  })

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCoordinate(location);
    })();
  }, []);

  useEffect(() => {
    console.log(coordinate)
  }, [coordinate])

  const sendInterval = async () => {
    socketInstance.emit('send:interval', coordinate)
  }

  const start = () => {
    setEmit(setInterval(() => {
      sendInterval()
    }, 2000))
  }

  const stop = () => {
    clearInterval(emit)
    setEmit('')
    setStatus('arive')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button 
        title="Start Trip"
        onPress={start}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
  },
})