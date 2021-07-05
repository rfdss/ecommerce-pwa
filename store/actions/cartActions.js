import axios from 'axios'
import _ from 'lodash'
// import dayjs from 'dayjs'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'


// MAIN FUNCTIONS

export const resetCart = ({ commit }) => {
  localStorage.removeItem('cartItems')
  commit(Types.RESET_CART, [])
  commit(Types.CALCULATE_AMOUNT, 0)
}

export const updateCart = ({ commit }, items) => {
  commit(Types.UPDATE_CART, items)
  const amount = calculateAmount(items)
  commit(Types.CALCULATE_AMOUNT, amount)
}

export const cartAddItem = ({ commit, state }, item) => {
  let { cartItems } = state.cart
  cartItems = [ ...cartItems, item ]
  const amount = calculateAmount(cartItems)

  commit(Types.UPDATE_CART, cartItems)
  commit(Types.CALCULATE_AMOUNT, amount)
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const cartRemoveItem = ({ commit, state }, itemId) => {
  const { cartItems } = state.cart
  const cartItemsFiltered = cartItems.filter(item => item.offerId != itemId)
  const amount = calculateAmount(cartItemsFiltered)

  commit(Types.REMOVE_PRODUCT, cartItemsFiltered)
  commit(Types.CALCULATE_AMOUNT, amount)
  localStorage.setItem('cartItems', JSON.stringify(cartItemsFiltered))
}

export const cartUpdateItemQuantity = ({ commit, state }, payload) => {
  const { cartItems } = state.cart
  const { item, quantidade } = payload
  const newItem = { ...item, quantidade }

  const cartItemsMapped = cartItems.map(i => {
    if (i.offerId == item.offerId) i = newItem
    return i
  })

  const amount = calculateAmount(cartItemsMapped)

  commit(Types.UPDATE_CART, cartItemsMapped)
  commit(Types.CALCULATE_AMOUNT, amount)
  localStorage.setItem('cartItems', JSON.stringify(cartItemsMapped))
}

export const calculateCartAmount = ({ commit, state }) => {
  const { cartItems } = state.cart
  const amount = calculateAmount(cartItems)
  commit(Types.CALCULATE_AMOUNT, amount)
}

export const saveOrder = async ({ commit, state}, payload) => {
  const { deliveryDate, deliveryObs, payment } = payload
  const orderData = await handleOrderData(state, deliveryDate, deliveryObs, payment)
  return axios.put(Endpoints.saveOrder, orderData, Config.API_OPTIONS)
}

// OTHERS FUNCTIONS

export const getMinOrderValues = async ({ commit }, json) => {
  return await axios.put(Endpoints.getMinOrderValues, json, Config.API_OPTIONS)
}

// HELPERS

const handleOrderData = async (state, deliveryDate, deliveryObs, payment) => {
  const { user, cart: { cartItems }} = state

  let auxCartItems = cartItems
  if (!cartItems || cartItems.length <= 0) {
    auxCartItems = localStorage.getItem('cartItems')
  }

  const totalOrder = _.sumBy(auxCartItems, item => calculateTotalOrder(item) * item.quantidade)

  const orderData = {
    customerId: user.customerId,
    status: 'PENDENTE',
    deliveryAddress: user.customer.deliveryAddress,
    deliveryDate: deliveryDate,
    deliveryObs: deliveryObs,
    totalOrder: totalOrder,
    obs: '',
    orderAppItems: handleOrderItems(auxCartItems),
    payment: payment
  }

  return orderData
}

const handleOrderItems = (cartItems) => {
  const orderItems = cartItems.map((item) => {
    const itemPrice = calculateTotalOrder(item)
    return {
      id: 0,
      orderAppId: 0,
      offerId: item.offerId,
      supplierId: item.supplier.id,
      quantity: item.quantidade,
      price: itemPrice,
      unit: item.unit,
      totalItem: item.quantidade * itemPrice,
      obs: item.description || item.title
    }
  })

  return orderItems
}

const calculateTotalOrder = (item) => {
  let price = (item.todayPrice > 0) ? item.todayPrice : item.price
  
  if (item.quantidade > item.promotionQuantity && item.promotionQuantity > 0) {
    price = item.promotionPrice
  }

  if (item.quantidade > item.promotionQuantity2 && item.promotionQuantity2 > 0) {
    price = item.promotionPrice2
  }

  if (item.quantidade > item.promotionQuantity3 && item.promotionQuantity3 > 0) {
    price = item.promotionPrice3
  }

  return price
}

const calculateAmount = (cartItems) => {

  const amount = _.sumBy(cartItems, (item) => {
    const {
      promotionPrice, promotionQuantity, price, quantidade,
      promotionPrice2, promotionQuantity2, promotionPrice3, promotionQuantity3,
      todayPrice
    } = item

    let auxPrice = (todayPrice > 0) ? todayPrice : price

    if (quantidade > promotionQuantity3 && promotionQuantity3 > 0 ) {
      auxPrice = promotionPrice3
      return quantidade * auxPrice
    }
    
    if (quantidade > promotionQuantity2  && promotionQuantity2 > 0 ) {
      auxPrice = promotionPrice2
      return quantidade * auxPrice
    }
    
    if (quantidade > promotionQuantity && promotionQuantity > 0) {
      auxPrice = promotionPrice
      return quantidade * auxPrice
    }
    
    return quantidade * auxPrice
  })

  return amount.toFixed(2)
}
