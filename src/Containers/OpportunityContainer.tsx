import * as React from 'react'
// withApollo enables component with client object
// to make graphql client query 
import { withApollo } from 'react-apollo'
import { OpportunityQuery } from './queries/OpportunityQuery'
import { connect } from 'react-redux'
import { AppState } from '../store/reducer'
import { OpportunityAction } from '../store/actions'
import { OpportunitiesProvider } from '../Contexts'
import { OpportunitiesResponse, OpportunitiesProps, OpportunitiesData } from '../typings'
import { UpdateQuery } from './queries/OpportunityQuery'
import * as moment from 'moment'

class OpportunityContainer extends React.Component<any> {
    constructor(props: any) {
        super(props)
        this.updateData = this.updateData.bind(this)
        this.updateOpportunity = this.updateOpportunity.bind(this)
    }
    // defaultState - initial data received from response
    defaultState: any = []
    // updatedPostBody - contains all the changes made to the state
    updatePostBody: any = {}
    componentDidMount() {
        const { client } = this.props
        // Graphql query is made to get the opportunities result
        // and the response is passed to store
        client.query({ query: OpportunityQuery })
        .then((res: OpportunitiesResponse ) => {
            const { data } = res
            let actionObj = {
                type: "Opportunity",
                data
            }
            console.log(data)
            this.props.dispatch(OpportunityAction(actionObj))
            this.defaultState = { ...data }
        })
        .catch((err: Error) => console.log(err))
    }
    updateOpportunity(id: string) {
        if(id) {
            const { client,data } = this.props
            let clnedData = [ ...data ]
            let curOpportunity: any = clnedData.filter(opportunityItem => opportunityItem.id === id)
            let errors = this.validateOpportunityFields({ ...curOpportunity[0] }, id)
            if(errors && Object.keys(errors).length === 0) {
                // get the updated data of the opportunity for the given id
                let postBody = this.updatePostBody && this.updatePostBody[id]
                if(postBody.opportunity) {
                    postBody.opportunity.id = id
                }
                client.mutate({
                    variables: postBody,
                    mutation: UpdateQuery
                })
                .then((response: any) => {
                    const updatedResponse = response && response.data && response.data.updateOpportunity || {}
                    let { id } = updatedResponse
                    const { data } = this.props
                    const updatedOpportunitiesArr = this.defaultState.opportunities || []
                    const updatedOpportunitiesArrLen = updatedOpportunitiesArr.length
                    for(let i = 0; i < updatedOpportunitiesArrLen; i++) {
                        if(updatedOpportunitiesArr[i] && updatedOpportunitiesArr[i].id === id) {
                            updatedOpportunitiesArr[i] = updatedResponse
                            if(data.length && data[i] && data[i].id === id) {
                                data[i] = updatedResponse
                                let actionObj = {
                                    type: 'Opportunity',
                                    data: {
                                        opportunities: data
                                    }
                                }
                                this.props.dispatch(OpportunityAction(actionObj))
                            }
                            break
                        }
                    }
                })
                .catch((err: Error) => console.log(err))
            }
            else {
                // curOpportunity[0].errors = errors
                clnedData.map(data => {
                    if(data.id === id) {
                        data.errors = errors
                    }
                })
                this.props.dispatch(OpportunityAction({
                    type: 'Opportunity',
                    data: {
                        opportunities: clnedData
                    }
                }))
            }
        }
    }
    private validateOpportunityFields(curOpportunity: any, id: string) {
        let errors: any = {}
        if(curOpportunity && id) {
            if(curOpportunity.title) {
                if(curOpportunity.title.trim().length === 0) {
                    errors['title'] ='Title cannot be empty'
                }
                else if(curOpportunity.title.trim().length > 100) {
                    errors['title'] = 'Title cannot be greater than 100 chnracters long'
                }
            }
            else {
                errors['title'] = 'Title cannot be empty'
            }
            if(curOpportunity.description) {
                if(curOpportunity.description.trim().length === 0) {
                    errors['description'] = 'Description cannot be empty'
                }
            }
            else {
                errors['description'] = 'Description cannot be empty'
            }
            if(curOpportunity.salary) {
                if(curOpportunity.salary.trim().length === 0) {
                    errors['salary'] = 'Salary cannot be empty'
                }
            }
            else {
                errors['salary'] = 'Salary cannot be empty'
            }
            if(curOpportunity.backgrounds) {
                if(curOpportunity.backgrounds.length < 1 && curOpportunity.backgrounds.length > 3) {
                    errors['backgrounds'] = 'Backgrounds selected must be between 1 and 3'
                }
            }
            else {
                errors['backgrounds'] = 'Backgrounds selected must be between 1 and 3'
            }
            if(curOpportunity.city) {
                if(curOpportunity.city.trim().length === 0) {
                    errors['city'] = 'City cannot be empty'
                }
            }
            else {
                errors['city'] = 'City cannot be empty'
            }
            if(curOpportunity.selection_process) {
                if(curOpportunity.selection_process.trim().length === 0) {
                    errors['selection_process'] = 'Selection Process cannot be empty'
                }
            }
            else {
                errors['selection_process'] = 'Selection Process cannot be empty'
            }
            if(curOpportunity.applications_close_date) {
                if(curOpportunity.applications_close_date.trim().length === 0) {
                    errors['applications_close_date'] = 'Applications Close Date cannot be empty'
                }
                else {
                    let curDate = new Date()
                    let closeDate = new Date(curOpportunity.applications_close_date)
                    let diffDate = moment(curDate).diff(moment(closeDate), 'days')
                    if(diffDate && diffDate > -30 && diffDate > 90) {
                        errors['applications_close_date'] = 'Applications Close Date cannot be less than 30 days and greater than 90 days'
                    }
                }
            }
            else {
                errors['applications_close_date'] = 'Applications Close Date cannot be empty'
            }
            if(curOpportunity.earliest_start_date && curOpportunity.latest_end_date) {
                if(curOpportunity.earliest_start_date.trim().length === 0) {
                    errors['earliest_start_date'] = 'Earliest start date cannot be empty'
                }
                else if(curOpportunity.latest_end_date.trim().length === 0) {
                    errors['latest_end_date'] = 'Latest end date cannot be empty'
                }
                else {
                    let startDate = new Date(curOpportunity.earliest_start_date)
                    let endDate = new Date(curOpportunity.latest_end_date)
                    let diffDate = moment(startDate).diff(moment(endDate), 'weeks')
                    if(diffDate && diffDate >= 6 && diffDate <= 78) {
                        errors['latest_end_date'] = 'Difrence betweeen Start and End date cannot be less than 6 weeks and greater than 78 weeks'
                    }
                }
            }
            else {
                if(curOpportunity.earliest_start_date.trim().length === 0) {
                    errors['latest_end_date'] = 'Earliest start date and Latest end date cannot be empty'
                }
            }
        }
        return errors
    }
    updateData(id: string, label: string, value: string) {
        const { data } = this.props
        // Temporary state object
        let UpdatedOpportunityStore: OpportunitiesData = {
            opportunities: []
        }
        // loop over the initial response data and check whether data is updated
        data.map((opportunity: OpportunitiesProps, index: number) => {
            if(opportunity && opportunity.id === id) {
                let originalOpportunityData = this.defaultState && this.defaultState && this.defaultState.opportunities && this.defaultState.opportunities[index] || {}
                let currentOpportunity: any = { ...opportunity }
                if(label && value) {
                    //  data is different from the initial state
                    if(originalOpportunityData[label] !== value) {
                        currentOpportunity[label] = value
                        // flag for indicating there was some chnges made to the opportunity
                        currentOpportunity.updateAvailable = true
                        if(this.updatePostBody[id]) {
                            if(!this.updatePostBody[id].opportunity) {
                                this.updatePostBody[id].opportunity = {}
                            }
                            this.updatePostBody[id].opportunity[label] = value
                        }
                        else {
                            this.updatePostBody[id] = {}
                            this.updatePostBody[id].opportunity = {}
                            this.updatePostBody[id].opportunity[label] = value
                        }
                    }
                    // when state data is same as the current data
                    //  all previous changes are reverted
                    else if(originalOpportunityData[label] === value) {
                        if(this.updatePostBody && this.updatePostBody[id]) {
                            let OpportunityPostBody = this.updatePostBody[id].opportunity
                            if(OpportunityPostBody) {
                                if(OpportunityPostBody[label]) {
                                  delete OpportunityPostBody[label]
                                }
                                if(!Object.keys(OpportunityPostBody).length) {
                                    currentOpportunity.updateAvailable = false
                                    delete this.updatePostBody[id]
                                }
                            }
                        }
                    }
                    UpdatedOpportunityStore.opportunities.push(currentOpportunity)
                }
                else {
                    UpdatedOpportunityStore.opportunities.push(currentOpportunity)
                }
            }
            else {
                UpdatedOpportunityStore.opportunities.push(opportunity)
            }
        })
        let actionObj = {
            type: 'Opportunity',
            data: UpdatedOpportunityStore
        }
        console.log(this.updatePostBody)
        this.props.dispatch(OpportunityAction(actionObj))
        // const UpdatedOpportunity = data.filter((opportunity: OpportunitiesProps) => opportunity.id === id)
    }
    render() {
        const { data, children } = this.props
        const providerValue = {
            data,
            updateValue: this.updateData,
            applyOpportunityChanges: this.updateOpportunity
        }
        return (
            <OpportunitiesProvider value={providerValue}>
                {children}
            </OpportunitiesProvider>
        )
    }
}
const mapStateToProps = (state: AppState) => ({
    data: state.OpportunityReducer
})

export default connect(mapStateToProps)(withApollo(OpportunityContainer))