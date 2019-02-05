import callAPI from '../../utils/callAPI'

const buzzDataAPIBase = `${__API__.global}/list/`

export function getBuzzFirstSection (dispatch, state, details) {
  dispatch({
    type: 'HOME_BUZZ_SET_TAB',
    payload: details.id
  })
  const isBuzz = state.homepage && state.homepage.buzz && state.homepage.buzz && state.homepage.buzz
  if (isBuzz && isBuzz[details.id]) {
    return Promise.resolve(state.homepage.buzz[details.id])
  }

  return getBuzzSection(dispatch, { id: details.id, next: details.next }, state)
}

export function getBuzzSection (dispatch, details, state) {
  if (!details.next) { return Promise.resolve() }

  let url = `${buzzDataAPIBase}${details.id}?${details.next}`
    return  callAPI(url, {urlParams: {tabId: '4e82d34404a477419f811cd303e216e7'}}, state)
    .then(data => {
      dispatch({
        type: 'HOMEPAGE_BUZZ_DATA',
        payload: {
          data: data.items,
          id: details.id,
          next: data.next
        }
      })
    })
}