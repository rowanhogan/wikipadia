import uuid from 'uuid/v4'

export const addTab = (name, path) => dispatch =>
  dispatch({
    type: 'TABS/ADD',
    payload: { name, path }
  })

export const removeTab = id => dispatch =>
  dispatch({
    type: 'TABS/REMOVE',
    payload: { id }
  })

export default (state = [], action) => {
  switch (action.type) {
    case 'TABS/ADD': {
      const { name, path } = action.payload

      return [
        ...state,
        { name, path, id: uuid() }
      ]
    }

    case 'TABS/REMOVE': {
      const { id } = action.payload

      if (state.length === 2) {
        return []
      }

      return state.filter(tab => tab.id !== id)
    }

    default:
      return state
  }
}
