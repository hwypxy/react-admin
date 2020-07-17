export function language(lang) {
  return {
    type: lang,
  }
}
export function languageChange(lang) {
  // console.log("111", lang)
  return (dispatch) => {
    dispatch(language(lang))
  }
}
