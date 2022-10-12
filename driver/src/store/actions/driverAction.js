import { GET_CHAT, GET_DRIVER, PATCH_STATUS } from './typeAction'
import { baseUrl } from '../../constants/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const getDriver = (payload) => {
  return {
    type: GET_DRIVER,
    driver: payload
  }
}

export const getDataDriver = () => {
  return async (dispatch, getState) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      const value = JSON.parse(jsonValue)
      const { id } = value

      const { data } = await axios({
        url: baseUrl + "/drivers/" + id,
        method: "GET"
      })
      dispatch(getDriver(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const patchStatus = (payload) => {
  return {
    type: PATCH_STATUS,
  }
}

export const patchStatusDriver = (payload) => {
  return async (dispatch, getState) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      const value = JSON.parse(jsonValue)
      const { id } = value

      await axios({
        url: baseUrl + "/drivers/" + id,
        method: "PATCH",
        data: { driverStatus: payload }
      })
      dispatch(patchStatus())
    } catch (err) {
      console.log(err)
    }
  }
}

export const getChat = (payload) => {
  return {
    type: GET_CHAT,
    chat: payload.chat
  }
}

export const getDataChat = () => {
  return async (dispatch, getState) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      const value = JSON.parse(jsonValue)
      const { id } = value
      console.log(id)

      const { data } = await axios({
        method: 'GET',
        url: `${baseUrl}/drivers/chat/${id}`
      })
      const payload = { chat: data }
      dispatch(getChat(payload))
    } catch (err) {
      console.log(err)
    }
  }
}