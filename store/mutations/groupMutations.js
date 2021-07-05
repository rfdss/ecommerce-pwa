// GROUP MUTATIONS

export const FETCH_GROUPS = (state, groupsList) => {
  state.group.groupsList = groupsList
}

export const SET_CURRENT_GROUP = (state, group) => {
  state.group.currentGroup = group
}
