import { OpportunityActionTypes } from '../../typings'

const OpportunityAction = (ActionData: OpportunityActionTypes) => {
    return {
        type: 'Opportunity',
        data: ActionData.data
    }
}

export { OpportunityAction }