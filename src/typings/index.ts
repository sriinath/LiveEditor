import { ApolloError } from 'apollo-boost'

interface EditableElementProps extends OpportunityEventProps {
    value: string
    maxLength?: number
    label?: string
    id: string
    labelIdentifier?: string
}
interface ItemBlockProps extends EditableElementProps {
    isDate?: boolean
}
interface ContainerQueryTypes {
    loading?: boolean
    error?: ApolloError
    data?: OpportunitiesProps[]
}
interface OpportunitiesProps {
    id: string
    title: string
    description: string
    applications_close_date: string
    earliest_start_date: string
    latest_end_date: string
    backgrounds: [Background]
    selection_process: string
    salary: string
    city: string
    updateAvailable?: boolean
}
interface OpportunitiesResponse {
    data: OpportunitiesData
}
interface OpportunitiesData {
    opportunities: OpportunitiesProps[]
}
interface Background {
    name: string
}
interface OpportunityActionTypes {
    type: string
    data?: OpportunitiesData
}
interface OpportunityEventProps {
    inputChange?: (id: string, label: string, value: string ) => void
    applyOpportunityChanges?: (id: string) => void
}
export {
    EditableElementProps,
    ItemBlockProps,
    ContainerQueryTypes,
    OpportunitiesProps,
    OpportunityActionTypes,
    OpportunitiesResponse,
    OpportunitiesData,
    OpportunityEventProps
}