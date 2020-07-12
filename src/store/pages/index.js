
export const storePage = (title, data) => dispatch =>
  dispatch({
    type: 'PAGES/STORE',
    payload: { title, data }
  })

export default (state = {}, action) => {
  switch (action.type) {
    case 'PAGES/STORE': {
      const { title, data } = action.payload

      return {
        ...state,
        [title]: data
      }
    }

    default:
      return state
  }
}
