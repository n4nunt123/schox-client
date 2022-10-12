import { useState } from "react";
import { View, Text } from "react-native";
import { socketInstance } from '../socket/socket'

export default function TripScreen() {
  const [driverCoordinate, setDriverCoordinate] = useState({})

  socketInstance.on("recieve:interval", (data) => {
    setDriverCoordinate(data)
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>TRIP SCREEN</Text>
      <Text>{JSON.stringify(driverCoordinate)}</Text>
    </View>
  )
}