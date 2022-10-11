import * as TalkRn from '@talkjs/expo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TalkOne() {
  const driver = {
    id: '123456789',
    name: 'driver',
    email: 'driver@example.com',
    photoUrl: 'https://cdn.discordapp.com/attachments/1007286935926095954/1007288163909242990/unknown.png',
  };

  const customer = {
    id: '987654321',
    name: 'customer',
    email: 'customer@example.com',
    photoUrl: 'https://cdn.discordapp.com/attachments/1007286935926095954/1011903660055343204/OMOCAT_Logo.png',
  };

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