import { getOpportunitiesData } from '../Requests/opportunities'
const resolvers = {
    Query: {
        opportunities: () => getOpportunitiesData()
    }
}

export { resolvers }