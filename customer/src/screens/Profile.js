import { View, Text, Button } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text>PROFILE SCREEN</Text>

      <Button 
        title='TOP UP'
        color='blue'
        onPress={() => navigation.navigate('Midtrans')}
      />
      
    </View>
  )
}