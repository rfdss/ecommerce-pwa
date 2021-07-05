import axios from 'axios'
import _ from 'lodash'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

// Seta o grupo atual
export const setCurrentGroup = ({ commit, state }, groupId) => {
  const { group: { groupsList }} = state
  const currentGroup = groupsList.find(g => g.id == groupId)
  commit(Types.SET_CURRENT_GROUP, currentGroup)
}

export const fetchGroupsList = async ({ commit, state }) => {
  let groupsList = sessionStorage.getItem('groupsList')
  groupsList = JSON.parse(groupsList)

  if (groupsList != null) {
    commit(Types.FETCH_GROUPS, groupsList)
    commit(Types.SET_CURRENT_GROUP, groupsList[0])
    return true
  }

  await axios.get(`${Endpoints.getMenu}/0`, Config.API_OPTIONS)
  .then(response => {
    commit(Types.FETCH_GROUPS, response.data)
    commit(Types.SET_CURRENT_GROUP, response.data[0])
    sessionStorage.setItem('groupsList', JSON.stringify(response.data))
  })
  .catch(error => {
    console.debug('API ERROR:', error)
  })
}
