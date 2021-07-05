// FAVORITES MUTATIONS

export const RESET_FAVORITES = (state) => {
  state.favorite.favoriteItems = []
}

export const UPDATE_FAVORITES = (state, items) => {
  state.favorite.favoriteItems = items
}

export const REMOVE_FAVORITE = (state, items) => {
  state.favorite.favoriteItems = items
}
