import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';

import iconSubs from '../../assets/icon/Subscribe.png';
import iconProfl from '../../assets/icon/SeekPng.com_profile-icon-png_9665493.png'

function HomeScreen1() {
    return (
        <View style={styles.container}>
            <View style={styles.userView}>
                <Image style={styles.iconProfl}
                    source={iconProfl} />
                <View style={{ marginStart: 15 }}>
                    <Text style={styles.hallo}>Hallo, User!</Text>
                    <Text style={styles.date}>Kamis, 21 Januari 2022</Text>
                </View>
            </View>
            <View style={styles.mainCard}>
                <View style={styles.infoView}>
                    <Text style={styles.infoText}>Kamu belum{"\n"}ada subscription</Text>
                </View>
                <Image style={styles.iconSubs}
                    source={iconSubs} />
                <View>
                    <Text style={styles.subsText}>Subscribe Now</Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEE8FF',
        paddingHorizontal: 20
    },
    userView: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 75,
        marginBottom: 40
    },
    iconProfl: {
        width: 75,
        height: 75
    },
    hallo: {
        color: '#2B377F',
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 2,
        marginTop: 5
    },
    date: {
        color: '#999999',
        fontWeight: '600',
        fontSize: 13
    },
    mainCard: {
        width: '100%',
        height: 545,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    infoView: {
        height: 200,
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 20
    },
    infoText: {
        color: '#2B377F',
        fontWeight: '600',
        fontSize: 25,
        textAlign: 'center'
    },
    iconSubs: {
        width: 200,
        height: 200,
        marginBottom: 10
    },
    subsText: {
        color: '#2B377F',
        fontWeight: '600',
        fontSize: 17,
    }
});

export default HomeScreen1;