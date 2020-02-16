const { localStorage } = window

export const updateSetting = (name, value) => dispatch =>
  Promise.resolve()
    .then(() => localStorage.setItem(name, value))
    .then(() =>
      dispatch({
        type: 'SETTINGS/UPDATE',
        payload: { name, value }
      })
    )

const getBooleanValue = key => localStorage.getItem(key) === 'true'

const initialState = {
  darkMode: localStorage.getItem('darkMode')
    ? getBooleanValue('darkMode')
    : window.matchMedia('(prefers-color-scheme: dark)').matches,
  lowContrast: getBooleanValue('lowContrast'),
  sansSerif: getBooleanValue('sansSerif')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SETTINGS/UPDATE': {
      const { name, value } = action.payload

      return {
        ...state,
        [name]: value
      }
    }
    default:
      return state
  }
}
