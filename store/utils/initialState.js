export const user = {
  data: {},
  token: ''
}

export const group = {
  currentGroup: null,
  groupsList: []
}

export const category = {
  currentCategory: null,
  categoriesList: [],
  categoryFilter: 'mais-baratos',
  offers: [],
  topOffers: [],
  search: []
}

export const offer = {
  offersList: [],
  topOffersList: [],
}

export const supplier = {
  suppliersList: [],
  suppliersListError: [],
  currentSupplier: '',
  currentSupplierError: '',
}

export const cart = {
  // cartItems: []
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  amount: 0
}

export const favorite = {
  // favoriteItems: []
  favoriteItems: JSON.parse(localStorage.getItem('favoriteItems')) || [],  
}

export const order = {
  currentOrder: {},
  ordersList: [],
}

export const checkout = {
  currentStep: 'auth',
  steps: [
    'auth',
    'order-review',
    'delivery',
    'payment'
  ]
}

export const search = {
  filter: {
    title: '',
    groupId: '',
    productId: '',
    offerId: '',
    offerPriceFrom: 0,
    offerPriceTo: 0,
    supplierId: 0,
    sortBy: { field: 'price', order: 'desc' },
    perPage: 10,
    sortByOpen: false,
    filterByOpen: false
  },
  offers: []
}
