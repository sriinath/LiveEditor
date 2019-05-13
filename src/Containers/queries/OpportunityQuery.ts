import { gql } from "apollo-boost"

const OpportunityQuery = gql`
{
    opportunities {
        id
        title
        description
        applications_close_date
        earliest_start_date
        latest_end_date
        backgrounds {
            name
        }
        selection_process
        salary
        city
    }
}`

export { OpportunityQuery }