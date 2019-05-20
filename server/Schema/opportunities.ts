import { gql } from 'apollo-server'

const typeDefs = gql`
    type Query {
        opportunities: [Opportunity] 
    }
    type Opportunity {
        id: String
        title: String
        description: String
        applications_close_date: String
        earliest_start_date: String
        latest_end_date: String
        backgrounds: [Background]
        backgroundsData: [Background]
        selection_process: String
        salary: String
        city: String
    }
    type Background {
        name: String
        id: String
        option: String
    }
    type Mutation {
        updateOpportunity(opportunity: UpdateOpportunityProps): Opportunity
    }
    input UpdateOpportunityProps {
        id: String!
        title: String
        description: String
        applications_close_date: String
        earliest_start_date: String
        latest_end_date: String
        backgrounds: [UpdateBackgroundProps]
        selection_process: String
        salary: String
        city: String        
    }
    input UpdateBackgroundProps {
        name: String
    }
`

export { typeDefs }