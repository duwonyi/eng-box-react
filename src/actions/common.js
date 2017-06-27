import * as types from '../constants/ActionTypes'

export const changeSaveStatus = status => ({
  type: types.CHANGE_SAVE_STATUS,
  status
})
