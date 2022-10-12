import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import driverReducer from './reducer/driverReducer'

const rootReducer = combineReducers({
  driverReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store