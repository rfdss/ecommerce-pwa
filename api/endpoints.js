import { API_URL } from './config'

// LOGIN, LOGOUT, PASSWORD RECOVERY, REGISTER, UPDATE PROFILE
export const login             = `${API_URL}Account`;
export const register          = `${API_URL}Account`;
export const profileUpdate     = `${API_URL}Account`;
export const recovery          = `${API_URL}RecoverPassword`;
export const getAddress        = `${API_URL}Customer`;
export const saveAddress       = `${API_URL}Customer`;


// CATEGORIES / PRODUCTS / OFFERS
export const getMenu           = `${API_URL}Menu`;
export const getTopOffers      = `${API_URL}MenuTopOffers`;
export const getProductById    = `${API_URL}SupplierOffer`;
export const getProducts       = `${API_URL}Menu`;


// ORDER / RATING
export const saveOrder         = `${API_URL}OrderApp`;
export const getOrders         = `${API_URL}OrderCustomer`;
export const getOrder          = `${API_URL}OrderCustomer`;
export const saveOrderTicket   = `${API_URL}OrderTicket`;
export const saveRating        = `${API_URL}OrderRating`;


// SUPPLIER / CHECK MIN ORDER VALUE
export const getMinOrderValues = `${API_URL}Supplier`;
export const getSuppliers      = `${API_URL}AdminSupplier`;
