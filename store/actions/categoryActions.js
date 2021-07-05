// import axios from 'axios'
// import _ from 'lodash'

// import * as Config from '@/api/config'
import * as Types from './helpers/types'
// import * as Endpoints from '@/api/endpoints'

// Seta qual o tipo de filtro será usado na listagem das oferta
export const setCategoryFilter = ({ commit }, filter) => {
  commit(Types.SET_CATEGORY_FILTER, filter)
}
