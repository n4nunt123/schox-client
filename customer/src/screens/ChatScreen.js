import * as React from "react";
import * as TalkRn from '@talkjs/expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useFocusEffect} from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux"
import { getDataUser } from "../store/actions/userAction";

export default function TalkOne() {
  const dispatch = useDispatch()
  const { driver, user } = useSelector((state) => {
      return state.userReducer
  })
  
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getDataUser())
    }, [])
  );

  const drivers = {
    id: '123456789',
    name: driver.fullName,
    email: driver.email,
    photoUrl: driver.imgUrl
  }

  const customer = {
    id: '987654321',
    name: user.fullName,
    email: user.email,
    photoUrl: 'https://cdn.discordapp.com/attachments/1007286935926095954/1011903660055343204/OMOCAT_Logo.png'
  }
  
  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(drivers, customer)
  );

  conversationBuilder.setParticipant(drivers);
  conversationBuilder.setParticipant(customer);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TalkRn.Session appId='t1aU0SS0' me={customer}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder}/>
      </TalkRn.Session>
    </SafeAreaView>
  );
}