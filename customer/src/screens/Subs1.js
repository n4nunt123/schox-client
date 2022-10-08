import { View, Text, Button } from "react-native";
import { useState } from "react";

export default function SubscriptionScreen({ navigation }) {
  const [flag, useFlag] = useState(false)

  const weekly = () => {
    useFlag(true)
  }

  const monthly = () => {
    useFlag(false)
  }

  const renderWeekly = () => {
    return <Text>WEEKLY SECTTION</Text>
  }

  const renderMonthly = () => {
    return <Text>MONTHLY SECTTION</Text>
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
      <Text>SUBSCRIPTION SCREEN</Text>

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Button 
          title='WEEKLY'
          color='blue'
          onPress={weekly}
        />
        <Button 
          title='MONTHLY'
          color='blue'
          onPress={monthly}
        />
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={{ marginBottom: 20 }}>
          {flag ? renderWeekly() : renderMonthly()}
        </View>
        
        <Button 
          title='SUBSCRIBE'
          color='red'
          onPress={() => navigation.navigate('Midtrans')}
        />
      </View>

    </View>
  )
}