import RootStack from "./src/navigators/RootStack";
import { Provider } from "react-redux";
import store from "./src/store/store";

export default function App() {
    return (
        <Provider store={store}>
            <RootStack />
        </Provider>    
    )
}