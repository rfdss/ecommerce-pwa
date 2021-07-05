import axios from 'axios'
import _ from 'lodash'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

export const logout = ({ commit }) => {
  sessionStorage.clear()
  commit('resetState')
}

export const login = ({ commit }, data) => {
  const { email, password } = data
  return axios.get(`${Endpoints.login}/${email}/${password}`, Config.API_OPTIONS)
}

export const register = ({ commit }, data) => {
  let { cpf, name, phone, email, password, customer } = data

  phone = data.phone.replace(/\D/g, '')
  cpf = data.cpf.replace(/\D/g, '')

  let user = {
    CpfCnpj: cpf,
    Name: name,
    Email: email,
    Password: password,
    TelefoneDdd: phone.substring(0, 2),
    TelefoneNumero: phone.substring(2, phone.length),
    customer: {
      name: customer.name,
      tradeName: customer.tradeName,
      cnpj: customer.cnpj,
      emailNFE: customer.emailNFE,
      ie: customer.ie,
      deliveryAddress: {
        cep: customer.deliveryAddress.cep,
        street: customer.deliveryAddress.street,
        district: customer.deliveryAddress.district,
        complement: customer.deliveryAddress.complement,
        city: customer.deliveryAddress.city,
        state: customer.deliveryAddress.state,
        number: customer.deliveryAddress.number
      }
    }
  }
  
  let userLocalStorage = sessionStorage.getItem('user')
  userLocalStorage = JSON.parse(userLocalStorage)

  if (userLocalStorage) {
    user = { ...user, Id: userLocalStorage.id }
    user = _.omit(user, 'Password')
  }

  return axios.post(Endpoints.register, user, Config.API_OPTIONS)
}

export const setUserData = ({ commit }, userData) => {
  const customer = userData.customer || _.first(userData.customers)

  let userAux = _.cloneDeep(userData)
  
  if (typeof(customer) != 'undefined' && customer != null) {
    userAux = { ...userAux, customerId: customer.id, customer: customer }
  }

  const userDataStr = JSON.stringify(userAux)
  sessionStorage.setItem('user', userDataStr)

  commit(Types.SET_USER_DATA, userAux)
}

export const setUserAddress = ({ commit }, address) => {
  let user = sessionStorage.getItem('user')
  user = JSON.parse(user)

  user.customer.localAddress = address
  user.customer.deliveryAddress = address
  user.customers = [ user.customer ]

  const userDataStr = JSON.stringify(user)
  sessionStorage.setItem('user', userDataStr)

  commit(Types.SET_USER_DATA, user)
}
