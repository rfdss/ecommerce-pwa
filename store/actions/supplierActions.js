import axios from 'axios'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

// Seta qual o tipo de filtro será usado na listagem das oferta
export const fetchSuppliers = async ({ commit }) => {
  await axios.get(Endpoints.getSuppliers, Config.API_OPTIONS)
  .then(({ data }) => {
    commit(Types.FETCH_SUPPLIERS_LIST, data)
  }).catch(error => {
    alert(error.response.data)
  })
}
