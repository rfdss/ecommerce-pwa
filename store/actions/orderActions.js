import axios from 'axios'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

export const fetchOrdersList = async ({ commit, state }, status) => {
  const { user: { customer }} = state

  await axios.get(`${Endpoints.getOrders}/${customer.id}/0/${status}`, Config.API_OPTIONS)
  .then(response => {
    commit(Types.FETCH_ORDERS, response.data)
  })
  .catch(error => {
    console.debug('API ERROR:', error)
  })
}

export const fetchOrder = ({ commit, state }, payload) => {
  const { user: { customer }} = state
  const { orderId, status } = payload

  axios.get(`${Endpoints.getOrder}/${customer.id}/${orderId}/${status}`, Config.API_OPTIONS)
  .then(response => {
    console.log(response)
    commit(Types.FETCH_ORDER, response.data)
  })
  .catch(error => {
    console.debug('API ERROR:', error)
  })
}

export const saveRating = async ({ commit, state }, payload) => {
  return await axios.put(`${Endpoints.saveRating}`, payload, Config.API_OPTIONS)
}

export const saveOrderTicket = async ({ commit, state }, payload) => {
  return await axios.put(`${Endpoints.saveOrderTicket}`, payload, Config.API_OPTIONS)
}
