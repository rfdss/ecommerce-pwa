// import axios from 'axios'
import _ from 'lodash'

import * as Types from './helpers/types'

export const resetFavorites = ({ commit }) => {
  localStorage.removeItem('favoriteItems')
  commit(Types.RESET_FAVORITES, [])
}

export const updateFavorites = ({ commit }, items) => {
  commit(Types.UPDATE_FAVORITES, items)
}

export const favoriteAddItem = ({ commit, state }, item) => {
  let { favoriteItems } = state.favorite
  favoriteItems = [ ...favoriteItems, item ]
  commit(Types.UPDATE_FAVORITES, favoriteItems)
  localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
}

export const favoriteRemoveItem = ({ commit, state }, itemId) => {
  const { favoriteItems } = state.favorite
  const favoriteItemsFiltered = favoriteItems.filter(item => item.offerId != itemId)
  commit(Types.REMOVE_FAVORITE, favoriteItemsFiltered)
  localStorage.setItem('favoriteItems', JSON.stringify(favoriteItemsFiltered))
}
