import * as React from "react";
import * as TalkRn from '@talkjs/expo';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import { baseUrl } from '../constants/baseUrl'

export default function TalkOne() {
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
      await getIdentity(value?.id, value?.access_token)
    } catch (err) {
      console.log(err)
    }
  }

  const getIdentity = async (id, access_token) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${baseUrl}/users/chat/${id}`,
        headers: { access_token }
      })
      setCustomer({
        id: '987654321',
        name: data.fullName,
        email: data.email,
        photoUrl: 'https://cdn.discordapp.com/attachments/1007286935926095954/1011903660055343204/OMOCAT_Logo.png'
      })
      setDriver({
        id: '123456789',
        name: data.Subscription.Driver.fullName,
        email: data.Subscription.Driver.email,
        photoUrl: data.Subscription.Driver.imgUrl
      })
    } catch (err) {
      console.log(err)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
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
      <TalkRn.Session appId='t1aU0SS0' me={customer}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder}/>
      </TalkRn.Session>
    </SafeAreaView>
  );
}