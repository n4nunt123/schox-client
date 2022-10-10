import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import { socketInstance } from '../socket/socket'

export default function DriverScreen() {

  const [emit, useEmit] = useState('')
  const [socket, setSocket] = useState('')
  let count = 0

  // untuk log, test update socket
  useEffect(() => {
    console.log(socket)
  }, [socket])

  const sendInterval = () => {
    count++
    socketInstance.emit('send:interval', count)
  }

  const start = () => {
    useEmit(setInterval(() => {
      sendInterval()
    }, 2000))
  }

  const stop = () => {
    clearInterval(emit)
    useEmit('')
    setSocket('')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>DRIVER SCREEN</Text>
      <Button 
        onPress={start}
        title='test SOCKET'
      />
      <Button 
        onPress={stop}
        title='stop SOCKET'
      />
      <Text>{socket}</Text>
    </View>
  )
}