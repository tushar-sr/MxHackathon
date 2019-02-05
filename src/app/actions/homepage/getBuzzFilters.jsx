import callAPI from '../../utils/callAPI'
import { tabsMapping } from '../../containers/homepage/tabData'
import findWhere from '../../utils/findWhere'

export default function getBuzzFilters (dispatch, state) {
  if (state.homepage && state.homepage.buzz && state.homepage.buzz.filters) {
    return Promise.resolve(state.homepage.buzz.filters)
  }
  const route = (state.router.params && state.router.params.tab) || ''
  const data = findWhere(tabsMapping, { href: route })
  const buzzFilterAPI = `${__API__.global}/home/tab/filter/${data.obj.id}`
  return new Promise((resolve, reject) => {
    callAPI(buzzFilterAPI, {}, state).then(data => {
      const buzzFilters = getFilters(data)
      dispatch({
        type: 'HOMEPAGE_BUZZ_FILTERS',
        payload: buzzFilters
      })
      resolve(buzzFilters)
    })
  })
}

function getFilters (data) {
  const filters = data && data.sections && data.sections.map((sectionData) => {
    return {
      id: sectionData.id,
      name: sectionData.name,
      next: sectionData.next
    }
  })
  return filters
}