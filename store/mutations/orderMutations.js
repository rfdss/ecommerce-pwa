// ORDERS MUTATIONS

export const FETCH_ORDERS = (state, ordersList) => {
  state.order.ordersList = ordersList
}

export const FETCH_ORDER = (state, order) => {
  state.order.currentOrder = order
}
