import * as initialState from './utils/initialState'

// Function to generate the initial state
function getInitialState() {
  return {
    
    ...initialState,
    
    overlay: {
      box: null,
      closable: true,
      loading: false,
      open: false,
    },

    sidebar: {
      currentItem: 'my-account',
      items: [
        { key: 'my-account', value: 'Meus dados' },
        { key: 'my-orders', value: 'Meus pedidos' }
      ],
      open: false,
    },

    toast: {
      autoClose: true,
      type: 'primary',
      title: 'Atenção!',
      content: 'Mensagem do sistema',
      open: false
    },
  }
}

export const state = () => getInitialState()

// Mutations

import * as authMutations from './mutations/authMutations'
import * as userMutations from './mutations/userMutations'
import * as groupMutations from './mutations/groupMutations'
import * as categoryMutations from './mutations/categoryMutations'
import * as productMutations from './mutations/productMutations'
import * as cartMutations from './mutations/cartMutations'
import * as favoriteMutations from './mutations/favoriteMutations'
import * as orderMutations from './mutations/orderMutations'
import * as supplierMutations from './mutations/supplierMutations'

// Actions

import * as authActions from './actions/authActions'
import * as userActions from './actions/userActions'
import * as groupActions from './actions/groupActions'
import * as categoryActions from './actions/categoryActions'
import * as productActions from './actions/productActions'
import * as cartActions from './actions/cartActions'
import * as favoriteActions from './actions/favoriteActions'
import * as orderActions from './actions/orderActions'
import * as supplierActions from './actions/supplierActions'

export const mutations = {

  ...authMutations,
  ...userMutations,
  ...groupMutations,
  ...categoryMutations,
  ...productMutations,
  ...cartMutations,
  ...favoriteMutations,
  ...orderMutations,
  ...supplierMutations,

  resetState (state) {
    const s = getInitialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  },

  SET_CURRENT_CHECKOUT_STEP (state, value) {
    state.checkout.currentStep = value
  },

  SET_OVERLAY (state, payload) {
    if (payload === null) {
      for (let prop in state.overlay) {
        state.overlay[prop] = null
      }
    } else {
      for (let prop in payload) {
        state.overlay[prop] = payload[prop]
      }
    }
  },
  
  // Show/Hide modal of 'filter by' in mobile
  SET_FILTER_BY_OPEN (state, value) {
    state.search.filter.filterByOpen = value
  },

  SET_SEARCH_FILTERS (state, payload) {
    state.search.filters = payload
  },
  
  SET_SIDEBAR_CURRENT_ITEM (state, value) {
    state.sidebar.currentItem = value
  },

  // Show/Hide mobile sidebar
  SET_SIDEBAR_OPEN (state, value) {
    state.sidebar.open = value
  },

  // Show/Hide modal of 'sort by' in mobile
  SET_SORT_BY_OPEN (state, value) {
    state.search.filter.sortByOpen = value
  },

  // Set 'sort by' filter
  SET_SORT_BY (state, value) {
    state.search.filter.sortBy = value
  },

  // Set generic toast config
  SET_TOAST (state, payload) {
    state.toast = payload
  },
  
  // Show/Hidee generic toast
  SET_TOAST_OPEN (state, value) {
    state.toast.open = value
  },
}

export const actions = {

  ...authActions,
  ...userActions,
  ...groupActions,
  ...categoryActions,
  ...productActions,
  ...cartActions,
  ...favoriteActions,
  ...orderActions,
  ...supplierActions,

  setCheckoutCurrentStep ({ commit }, value) {
    commit('SET_CURRENT_CHECKOUT_STEP', value)
  },

  setOverlay ({ commit }, payload) {
    commit('SET_OVERLAY', payload)
  },

  setFilterByOpen ({ commit }, value) {
    commit('SET_FILTER_BY_OPEN', value)
  },

  setSortByOpen ({ commit }, value) {
    commit('SET_SORT_BY_OPEN', value)
  },

  setSortBy ({ commit }, value) {
    commit('SET_SORT_BY', value)
  },

  setSearchFilter ({ commit }, payload) {
    commit('SET_SEARCH_FILTERS', payload)
  },

  setSidebarCurrentItem ({ commit }, value) {
    commit('SET_SIDEBAR_CURRENT_ITEM', value)
  },
  
  setSidebarOpen ({ commit }, value) {
    commit('SET_SIDEBAR_OPEN', value)
  },
  
  setToast ({ commit }, payload) {
    if (!payload.hasOwnProperty('open')) {
      payload = { ...payload, open: true }
    }
    
    commit('SET_TOAST', payload)

    setTimeout(() => {
      commit('SET_TOAST', {
        autoClose: true,
        type: 'primary',
        title: 'Atenção!',
        content: 'Mensagem do sistema',
        open: false
      })
    }, 3000)
  },

  setToastOpen ({ commit }, value) {
    commit('SET_TOAST_OPEN', value)
  }
}
