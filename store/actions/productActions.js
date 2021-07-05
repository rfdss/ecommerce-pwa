import axios from 'axios'
import _ from 'lodash'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

// Generic function to get products
const getProducts = async (payload) => {
  const { supplierId, groupId, categoryId, title } = payload
  const endpoint = `${Endpoints.getProducts}/${supplierId}/${groupId}/${categoryId}/${title}`
  return await axios.get(endpoint, Config.API_OPTIONS)
}

// Search page
export const fetchProducts = async ({ commit, state }, payload) => {
  const { category: { categoryFilter }} = state

  await getProducts(payload)
  .then(({ data }) => {
    let offersList = []
    
    if (categoryFilter === 'mais-baratos') {
      offersList = _.orderBy(data, 'price', 'asc')
    } else {
      offersList = _.orderBy(data, 'supplier.rating', 'desc')
    }

    commit(Types.FETCH_OFFERS, offersList)
  })
}

// Header SearchBar
export const fetchSearchBarProducts = async ({ commit, state }, payload) => {
  await getProducts(payload)
  .then(({ data }) => {
    let offersList = []
    offersList = _.orderBy(data, 'supplier.rating', 'desc')
    commit(Types.FETCH_SEARCHBAR_OFFERS, offersList)
  })
}

export const resetSearch = ({ commit }) => {
  commit(Types.WIPE_SEARCH, [])
}

export const fetchProductById = ({ commit }, payload) => {
  const { supplierId, productId } = payload
  const url = `${Endpoints.getProductById}/${supplierId}/${productId}`
  return axios.get(url, Config.API_OPTIONS)
}
