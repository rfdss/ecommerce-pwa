// PRODUCT MUTATIONS
// PRODUCT = OFFER

export const FETCH_OFFERS = (state, offersList) => {
  state.offer.offersList = offersList
}

export const FETCH_TOP_OFFERS = (state, topOffers) => {
  state.offer.topOffers = topOffers
}

export const FETCH_SEARCHBAR_OFFERS = (state, offers) => {
  state.search.offers = offers
}

export const WIPE_SEARCH = (state, offers) => {
  state.search.offers = offers
}
