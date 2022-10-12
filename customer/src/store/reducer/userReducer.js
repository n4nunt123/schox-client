import { GET_DRIVERS, GET_SCHOOLS, GET_USER, LOGIN, PATCH_BALANCE, POST_SUBSCRIPTION, REGISTER } from '../actions/typeAction'

const initialState = {
  user: {},
  school: {},
  driver: {},
  drivers: {},
  schools: {},
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
        school: action.school,
        driver: action.driver
      }
    case GET_DRIVERS:
      return {
        ...state,
        drivers: action.drivers
      }
    case POST_SUBSCRIPTION:
      return {
        ...state
      }
    case PATCH_BALANCE:
      return {
        ...state
      }
    default:
      return state
  }
}

export default userReducer