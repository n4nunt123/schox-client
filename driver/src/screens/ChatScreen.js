import * as React from "react";
import * as TalkRn from '@talkjs/expo';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import { baseUrl } from '../constants/baseUrl'

import { useDispatch, useSelector } from "react-redux"
import { getDataChat } from "../store/actions/driverAction";


export default function TalkOne() {
  const dispatch = useDispatch()
  const { chat } = useSelector((state) => {
      return state.driverReducer
  })

  console.log(chat)

  const [driver, setDriver] = useState({
    id: '',
    name: '',
    email: '',
    photoUrl: ''
  })
  const [customer, setCustomer] = useState({
    id: '',
    name: '',
    email: '',
    photoUrl: ''
  })

  const getData = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      let value = JSON.parse(jsonValue)
      await getIdentity(value?.id)
    } catch (err) {
      console.log(err)
    }
  }

  const getIdentity = async (id) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${baseUrl}/drivers/chat/${id}`
      })
      setCustomer({
        id: '987654321',
        name: data.Subscription.User.fullName,
        email: data.Subscription.User.email,
        photoUrl: 'https://cdn.discordapp.com/attachments/1007286935926095954/1011903660055343204/OMOCAT_Logo.png'
      })
      setDriver({
        id: '123456789',
        name: data.fullName,
        email: data.email,
        photoUrl: data.imgUrl
      })
    } catch (err) {
      console.log(err)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getDataChat())
      getData();
    }, [])
  );
  
  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(driver, customer)
  );

  conversationBuilder.setParticipant(driver);
  conversationBuilder.setParticipant(customer);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TalkRn.Session appId='t1aU0SS0' me={driver}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder}/>
      </TalkRn.Session>
    </SafeAreaView>
  );
}