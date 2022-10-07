import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function SubsScreen2() {
    return (
        <View style={styles.container}>
            <View style={styles.subsView}>
                <Text style={styles.subsText}>Subscriptions</Text>
            </View>
            <View style={styles.mainCard}>
                <View style={styles.infoView}>
                    <Text style={styles.infoText}>You already subscribed</Text>
                </View>
                <View>
                    <Text style={styles.endDateText}>End Date</Text>
                </View>
                <View>
                    <Text style={styles.dateText}>3 November, 2022</Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B377F'
    },
    subsView: {
        width: '100%',
        marginTop: 90,
        marginBottom: 15,
        marginStart: 40
    },
    subsText: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 30
    },
    mainCard: {
        width: '100%',
        height: 750,
        borderRadius: 40,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    infoView: {
        height: 200,
        paddingHorizontal: 30,
        marginTop: 20
    },
    infoText: {
        color: '#2B377F',
        fontWeight: '600',
        fontSize: 17,
        textAlign: 'center',
        marginTop: 20
    },
    endDateText: {
        color: '#2B377F',
        fontWeight: '400',
        fontSize: 50,
        textAlign: 'center',
        marginTop: 30
    },
    dateText: {
        color: '#808080',
        fontWeight: '600',
        fontSize: 16,
        marginTop: 5
    }
});

export default SubsScreen2;