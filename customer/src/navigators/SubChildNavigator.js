import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChooseSubscription from "../screens/ChooseSubscription";
import WeeklyScreen from "../screens/WeeklyScreen";
import MonthlyScreen from "../screens/MonthlyScreen";

const Stack = createNativeStackNavigator();
export default function SubChildNavigator({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChooseSubs" component={ChooseSubscription} options={{headerShown: false}} />
            <Stack.Screen name="Weekly" component={WeeklyScreen} />
            <Stack.Screen name="Monthly" component={MonthlyScreen} />
        </Stack.Navigator>
    )
}
