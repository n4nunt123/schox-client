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
    getLocation()
  }, [coordinate]);

  const getLocation = async() => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          return;
      }

      let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          enableHighAccuracy: true,
          timeInterval: 5
      });
      setCoordinate({longitude: location.coords.longitude, latitude: location.coords.latitude});
    } catch (e) {
      console.log(e)
    }
  }

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
      <Button 
        title="Stop Trip"
        onPress={stop}
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