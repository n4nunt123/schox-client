import { View, Text, Image, StyleSheet } from "react-native";
import school from "../../assets/icon/school.png";

export default function SchoolScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <Image source={school} style={styles.icon}/>
      <Text style={styles.name}>Sekolah Hacktip</Text>
      <Text style={styles.address}>Jalan kacang garuda, no.27</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 200,
    height: 200,
    marginTop: 140
  },
  name: {
    color: '#0d155a',
    fontWeight: 'bold',
    fontSize: 20,
  },
  address: {
    color: '#7182c5'
  }
})