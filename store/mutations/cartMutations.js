// PRODUCT MUTATIONS

export const RESET_CART = (state) => {
  state.cart.cartItems = []
}

export const UPDATE_CART = (state, items) => {
  state.cart.cartItems = items
}

export const REMOVE_PRODUCT = (state, items) => {
  state.cart.cartItems = items
}

export const CALCULATE_AMOUNT = (state, amount) => {
  state.cart.amount = amount
}
