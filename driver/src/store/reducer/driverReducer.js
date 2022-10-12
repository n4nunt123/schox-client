import { GET_DRIVER, GET_CHAT, PATCH_STATUS } from '../actions/typeAction'

const initialState = {
  driver: {},
  chat: {},
}

function driverReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVER:
      return {
        ...state,
        driver: action.driver
      }
    case GET_CHAT:
      return {
        ...state,
        chat: action.chat
      }
    case PATCH_STATUS:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default driverReducer