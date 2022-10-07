import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HOME SCREEN</Text>

      <Button 
        title='STATUS PERJALANAN'
        color='red'
        onPress={() => navigation.navigate('Trip')}
      />

      <Button 
        title='DRIVER'
        color='red'
        onPress={() => navigation.navigate('Driver')}
      />

      <Button 
        title='SCHOOL'
        color='red'
        onPress={() => navigation.navigate('School')}
      />
      
    </View>
  )
}