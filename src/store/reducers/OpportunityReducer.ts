import { OpportunityActionTypes } from '../../typings'

const OpportunityReducer = (state = {}, action: OpportunityActionTypes) => {
    const { type } = action
    switch(type) {
        case 'Opportunity': {
            return action && action.data && action.data.opportunities || []
        }
        default:
            return []
    }
}

export { OpportunityReducer }