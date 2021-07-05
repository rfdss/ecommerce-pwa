// CATEGORY MUTATIONS

export const FETCH_CATEGORIES = (state, categoriesList) => {
  state.category.categoriesList = categoriesList
}

export const SET_CATEGORY_FILTER = (state, categoryFilter) => {
  state.category.categoryFilter = categoryFilter
}
