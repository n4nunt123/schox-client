import { GET_DRIVERS, GET_SCHOOLS, GET_USER, PATCH_BALANCE, POST_SUBSCRIPTION } from './typeAction'
import { baseUrl } from '../../constants/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const getUser = (payload) => {
  return {
    type: GET_USER,
    user: payload.user,
    school: payload.school,
    driver: payload.driver
  }
}

export const getDataUser = () => {
  return async (dispatch, getState) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      const value = JSON.parse(jsonValue)
      const { id, access_token } = value

      const { data } = await axios({
        url: baseUrl + "/users/" + id,
        method: "GET",
        headers: {access_token }
      })
      dispatch(getUser(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getDrivers = (payload) => {
  return {
    type: GET_DRIVERS,
    drivers: payload,
  }
}

export const getDataDrivers = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/drivers",
        method: "GET"
      })
      dispatch(getDrivers(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getSchools = (payload) => {
  return {
    type: GET_SCHOOLS,
    schools: payload,
  }
}

export const getDataSchools = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/users/schools",
        method: "GET"
      })
      dispatch(getSchools(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const postSub = () => {
  return {
    type: POST_SUBSCRIPTION,
  }
}

export const postNewSub = (payload) => {
  return async (dispatch, getState) => {
    try {
      await axios({
        url: baseUrl + "/users/subscriptions",
        method: "POST",
        headers: { access_token: payload.access_token },
        data: payload.body
      })
      dispatch(postSub())
    } catch (err) {
      console.log(err)
    }
  }
}

export const patchBalance = () => {
  return {
    type: PATCH_BALANCE,
  }
}

export const patchNewBalance = (payload) => {
  return async (dispatch, getState) => {
    try {
      await axios({
        url: baseUrl + "/users/balances/" + payload.id,
        method: "PATCH",
        headers: { access_token: payload.access_token },
        data: { balance: payload.finalBalance }
      })
      dispatch(patchBalance())
    } catch (err) {
      console.log(err)
    }
  }
}