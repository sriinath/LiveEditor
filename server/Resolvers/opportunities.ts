import {
    getOpportunitiesData,
    updateOpportunitiesData
} from '../Requests/opportunities'

const resolvers = {
    Query: {
        opportunities: () => getOpportunitiesData()
    },
    Mutation: {
        updateOpportunity: (_, opportunity, ___) => {
            console.log(opportunity)
            return updateOpportunitiesData(opportunity)
        }
    }
}

export { resolvers }