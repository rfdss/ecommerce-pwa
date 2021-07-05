import axios from 'axios'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

export const fetchUserAddress = async ({ commit }) => {
  const userStore = sessionStorage.getItem('user')
  const user = JSON.parse(userStore)

  await axios.get(`${Endpoints.getAddress}/${user.id}`, Config.API_OPTIONS)
  .then(response => {
    const { data } = response
    commit(Types.SET_USER_ADDRESS, data)
  })
  .catch(error => {
    // TODO ERROR
    alert(error.response.data)
  })
}

export const saveAddress = ({ commit }, customer) => {
  const userStore = sessionStorage.getItem('user')
  const user = JSON.parse(userStore)

  const userAddress = customer.deliveryAddress

  let body = {
    AdminPersonId: user.id,
    Name: customer.name || user.name,
    TradeName: customer.tradeName || user.name,
    Cnpj: customer.cnpj || user.cpfCnpj,
    OrderEmail: customer.emailNFE || user.email,
    emailNFE: customer.emailNFE || user.email,
    TelefoneDdd: user.telefoneDdd,
    TelefoneNumero: user.telefoneNumero,
    LocalAddress: setDefaultAddress({ ...userAddress, Obs: 'Endereço Local' }, user),
    DeliveryAddress: setDefaultAddress({ ...userAddress, Obs: 'Endereço Local' }, user), // setDeliveryAddress(userAddress, user),
    IsBlocked: 0,
    DeliveryObs: customer.deliveryObs || '',
    InsertDate: new Date(),
    UpdateDate: new Date()
  }

  if (user.hasOwnProperty('id')) {
    body = { ...body, Id: customer.id }
    body = _.omit(body, 'InsertDate')
  }
  
  return axios.post(`${Endpoints.saveAddress}/${user.id}`, body, Config.API_OPTIONS)
}

// Helpers

const setDefaultAddress = (userAddress, user) => ({
  Street: userAddress.street,
  Number: userAddress.number,
  Cep: userAddress.cep,
  IsDisabled: 0,
  District: user.district || '',
  Complement: userAddress.complement || '',
  Obs: userAddress.obs || '',
  TelefoneDdd: user.telefoneDdd,
  TelefoneNumero: user.telefoneNumero,
  City: userAddress.city,
  State: userAddress.state,
  PersonId: user.id,
  Latitude: -20.58522,
  Longitude: -41.2358,
  InsertDate: new Date(),
  UpdateDate: new Date()
});

const setDeliveryAddress = (userAddress, user) => {
  return {
    Street: userAddress.enderecoEntrega,
    Number: userAddress.numeroEntrega,
    Cep: userAddress.cepEntrega,
    IsDisabled: 0,
    District: '',
    Complement: userAddress.complementoEntrega || '',
    Obs: 'Endereço de Entrega',
    TelefoneDdd: user.telefoneDdd,
    TelefoneNumero: user.telefoneNumero,
    City: userAddress.cidadeEntrega,
    State: userAddress.estadoEntrega,
    PersonId: user.id,
    Latitude: -20.58522,
    Longitude: -41.2358,
    InsertDate: new Date(),
    UpdateDate: new Date()
  }
}
