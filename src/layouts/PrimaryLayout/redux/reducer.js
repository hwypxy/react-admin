const initState = window.navigator.language

export default function language(state = initState, action) {
  switch (action.type) {
    case "en":
      return (state = "en")
    case "zh":
      return (state = "zh")
    default:
      return state
  }
}
