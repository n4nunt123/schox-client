import {FlatList, Image, Pressable, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import {baseUrl} from "../constants/baseUrl";
import {useFocusEffect} from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux"
import { getDataDrivers, postNewSub, patchNewBalance } from "../store/actions/userAction";


export default function WeeklyScreen({navigation, route}) {
    const dispatch = useDispatch()
    const { drivers } = useSelector((state) => {
        return state.userReducer
    })

    const [data, setData] = useState({})
    const [goHomeTime, setGoHome] = useState(new Date('Oct 11, 1975 12:30:00'))
    const [toSchoolTime, setToSchool] = useState(new Date('Oct 11, 1975 07:30:00'))
    const [showHome, setShowHome] = useState(false)
    const [showSchool, setShowSchool] = useState(false)
    
    const [schools, setSchools] = useState([])
    const [selectedSchool, setSelectedSchool] = useState(null)
    const [selectedSchoolName, setSelectedSchoolName] = useState("")
    const [selectedDriver, setSelectedDriver] = useState(null)

    const onChangeHome = (event, selectedDate) => {
        setShowHome(false)
        setGoHome(selectedDate)
    };
    const onChangeSchool = (event, selectedDate) => {
        setShowSchool(false)
        setToSchool(selectedDate)
    };
    const getSchool = async () => {
        try {
            const {data} = await axios({
                url: baseUrl + "/users/schools",
                method: "GET"
            })
            setSchools(data)
        } catch (e) {
            console.log(e)
        }
    }
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            let value = JSON.parse(jsonValue)
            setData(value)
        } catch(e) {
            console.log(e)
        }
    }

    const subscribe = async () => {
        try {
            const body = {
                type: "weekly",
                price: 300000,
                goHomeTime: `${goHomeTime.getHours()}:${goHomeTime.getMinutes()}`,
                toShoolTime: `${toSchoolTime.getHours()}:${toSchoolTime.getMinutes()}`,
                DriverId: selectedDriver,
                SchoolId: selectedSchool
            }

            const payloadSub = { 
                body, 
                access_token: data.access_token
            }
            dispatch(postNewSub(payloadSub))

            const payloadBalance = {
                id: data.id,
                access_token: data.access_token,
                finalBalance: route.params.finalBalance
            }
            dispatch(patchNewBalance(payloadBalance))
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getDataDrivers())
            getSchool()
            getData()
        }, [])
    );

    const renderSchool = () => {
        return schools.map(s => {
            return <Picker.Item label={s.name} value={s.id} key={s.id} />
        })
    }
    const renderDriver = ({item}) => {
        return (
            <Pressable onPress={() => {
                setSelectedDriver(item.id)
            }}>
                <View style={{width: 120, height: 200, marginHorizontal: 10, alignItems: "center", justifyContent: "center"}}>
                    <Image source={{uri: `${item.imgUrl}`}} style={[{width: 100, height: 100, borderRadius: 10}, selectedDriver === item.id ? styles.selectedTrue : null]} />
                    <Text style={{marginTop: 20, fontWeight: "bold"}}>{item.fullName}</Text>
                    <Text style={{marginTop: 5}}>{item.carType}</Text>
                </View>
            </Pressable>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                {showHome && <DateTimePicker
                    value={goHomeTime}
                    mode={'time'}
                    is24Hour={true}
                    onChange={onChangeHome}
                    positiveButtonLabel="Save"
                />}
                {showSchool && <DateTimePicker
                    value={toSchoolTime}
                    mode={'time'}
                    is24Hour={true}
                    onChange={onChangeSchool}
                    positiveButtonLabel="Save"
                />}
                {/* SCHEDULES */}
                <View style={styles.time}>
                    <Text style={styles.timeText}>Set go to school time: </Text>
                    <View style={styles.timeText2}>
                        <TouchableHighlight style={styles.timepicker} onPress={() => setShowSchool(true)}>
                            <Text
                                style={{fontWeight: "bold"}}>{`${toSchoolTime.getHours()}:${toSchoolTime.getMinutes()}`}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.time}>
                    <Text style={styles.timeText}>Set go home time: </Text>
                    <View style={styles.timeText2}>
                        <TouchableHighlight style={styles.timepicker} onPress={() => setShowHome(true)}>
                            <Text
                                style={{fontWeight: "bold"}}>{`${goHomeTime.getHours()}:${goHomeTime.getMinutes()}`}</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                {/* PICK SCHOOL */}
                <View style={{alignItems: "center"}}>
                    <View style={styles.time}>
                        <Picker
                            style={{width: "100%", height: 10}}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedSchool(itemValue)
                                const name = schools.filter(s => s.id === itemValue)
                                setSelectedSchoolName(name[0].name)
                            }
                        }>
                            <Picker.Item label="Schools" />
                            {renderSchool()}
                        </Picker>
                    </View>
                        {selectedSchool ? <Text style={{color: "darkgreen"}}>Selected: {selectedSchoolName}</Text>: null}
                </View>

                {/*  PICK DRIVER  */}
                <Text style={{marginTop: 30, fontWeight: "bold"}}>Please select your driver</Text>
                <View style={styles.driverCard}>
                    <FlatList
                        data={drivers}
                        renderItem={renderDriver}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                    />
                </View>
                <TouchableHighlight onPress={() => subscribe()} style={styles.subscribe}>
                    <Text style={styles.textSubscribe}>Subscribe</Text>
                </TouchableHighlight>
                {/*{selectedDriver ? <Text style={{color: "darkgreen"}}>Selected: {selectedDriver}</Text>: null}*/}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    subContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: 30,
        marginBottom: "25%",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 45,
        margin: 12,
        padding: 10,
        paddingLeft: 20,
        backgroundColor: "lightgrey",
        borderRadius: 30,
        width: '90%',
    },
    timepicker: {
        width: 100,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightblue",
        borderRadius: 10,
    },
    time: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "grey",
        borderRadius: 10,
        padding: 10,
        width: "90%",
        marginVertical: 10
    },
    timeText: {fontWeight: "bold", flex: 1, alignItems: "flex-start", justifyContent: "flex-start"},
    timeText2: {flex: 1, alignItems: "flex-end", justifyContent: "flex-end"},
    driverCard: {
        flexDirection: "row",
        width: "90%",
    },
    selectedTrue: {
        borderWidth: 3,
        borderColor: "lightgreen"
    },
    subscribe: {
        padding: 10,
        backgroundColor: "darkgreen",
        marginVertical: 10,
        borderRadius: 10,
        width: 120,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    textSubscribe: {
        fontWeight: "bold",
        color: "white",
        fontSize: 18
    }


})