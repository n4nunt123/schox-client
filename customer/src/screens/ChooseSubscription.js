import {View, Text, Button, StyleSheet, TouchableHighlight, Image} from "react-native";
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
    return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <View style={styles.price}>
              <Text style={{fontSize: 32, fontWeight: "bold"}}>Rp. 300.000,00</Text>
          </View>
            <Image style={{width: 200, height: 200, marginVertical: 20}} source={require("../../assets/icon/Subscribe.png")} />
            <TouchableHighlight style={styles.subs} onPress={() => navigation.navigate('Profile')}>
                <Text style={{color: "white", fontSize: 14}}>Subscribe Now</Text>
            </TouchableHighlight>
        </View>
    )
  }

  const renderMonthly = () => {
    return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <View style={styles.price}>
                <Text style={{fontSize: 32, fontWeight: "bold"}}>Rp. 1.000.000,00</Text>
            </View>
            <Image style={{width: 200, height: 200, marginVertical: 20}} source={require("../../assets/icon/Subscribe.png")} />
            <TouchableHighlight style={styles.subs} onPress={() => navigation.navigate('Profile')}>
                <Text style={{color: "white", fontSize: 14}}>Subscribe Now</Text>
            </TouchableHighlight>
        </View>
  )
  }

  return (
    <View style={styles.top}>
        <Text style={{color: "#2D367F", fontSize: 28, paddingTop: 50, fontWeight: "bold"}}>Subscription</Text>
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TouchableHighlight style={styles.subtype} onPress={weekly}>
                    <Text style={{color: "white", fontSize: 20}}>Weekly</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.subtype} onPress={monthly}>
                    <Text style={{color: "white", fontSize: 20}}>Monthly</Text>
                </TouchableHighlight>
            </View>
            <View style={{ flex: 1}}>
                {flag ? renderWeekly() : renderMonthly()}
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    top: { flex: 1, alignItems: 'center', marginTop: 20, backgroundColor: "#DEE8FF" },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: "100%",
        marginTop: 100,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        paddingTop: 20
    },
    subtype: {
        backgroundColor: "#2D367F",
        width: 170,
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 30,
        marginHorizontal: 5
    },
    price: {
        width: 280,
        height: 80,
        borderWidth: 2,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: "center",
        borderColor: "#2D367F"
    },
    subs: {
        backgroundColor: "#2D367F",
        width: 170,
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 30,
        marginHorizontal: 5
    }
})