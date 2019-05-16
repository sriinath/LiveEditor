import { combineReducers } from 'redux'
import * as Reducers from './reducers'

const OpportunitiesStore = combineReducers(Reducers)

export default OpportunitiesStore
export { OpportunitiesStore }
export type AppState = ReturnType<typeof OpportunitiesStore>