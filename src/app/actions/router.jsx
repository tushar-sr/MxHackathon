import { replace} from 'react-router-redux'
import { getCurrentStore } from '../routes'


export function replaceURL (url) {
  const store = getCurrentStore()
  store.dispatch(replace(url))
}