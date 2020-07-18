import uuid from 'uuid/v4'

export const activateTab = (id) => dispatch =>
  dispatch({
    type: 'TABS/ACTIVATE',
    payload: { id }
  })

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

const defaultState = {
  active: null,
  items: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TABS/ACTIVATE': {
      const { id } = action.payload

      return {
        ...state,
        active: id
      }
    }

    case 'TABS/ADD': {
      const { name, path } = action.payload
      const id = uuid()

      return {
        ...state,
        active: state.active || id,
        items: [
          ...state.items,
          { name, path, id }
        ]
      }
    }

    case 'TABS/REMOVE': {
      const { id } = action.payload

      if (state.length === 2) {
        return defaultState
      }

      return {
        ...state,
        items: state.items.filter(tab => tab.id !== id)
      }
    }

    default:
      return state
  }
}
