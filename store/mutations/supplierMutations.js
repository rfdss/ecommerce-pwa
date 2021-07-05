// SUPPLIER MUTATIONS

export const SET_CURRENT_SUPPLIER = (state, supplier) => {
  state.supplier.currentsupplier = supplier
}

export const FETCH_SUPPLIERS_LIST = (state, suppliersList) => {
  state.supplier.suppliersList = suppliersList
}
