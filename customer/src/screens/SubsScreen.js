import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {baseUrl} from "../constants/baseUrl";
import {useFocusEffect} from "@react-navigation/native";
import * as React from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux"
import { getDataUser } from "../store/actions/userAction";

function SubsScreen({navigation}) {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => {
        return state.userReducer
    })
    const date = moment(user.Subscription?.endDate).format('MMMM D, YYYY')

    const checkDate = async () => {
        try {
            // const jsonValue = await AsyncStorage.getItem('@storage_Key')
            // let value = JSON.parse(jsonValue)
            // if (moment() === moment(detail.Subscription?.endDate)) {
            //     await axios({
            //         url: baseUrl + "/users/subscriptions/" + value.id,
            //         method: "patch",
            //         headers: { access_token: value?.access_token },
            //         body: {status: "nonactive"}
            //     })
            // } else {
            //     console.log("belum selesai")
            // }
        } catch (e) {
            console.log(e)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getDataUser())
        }, [])
    );
    return (
        <View style={styles.container}>
            <View style={styles.subsView}>
                <Text style={styles.subsText}>Subscriptions</Text>
            </View>
            <View style={styles.mainCard}>
                <View>
                    <Text style={styles.infoText}>You already subscribed</Text>
                    <Text style={styles.endDateText}>End Date</Text>
                </View>
                <View>
                    <Text style={styles.dateText}>{date}</Text>
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
        alignItems: 'center',
        paddingTop: 150
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

export default SubsScreen;