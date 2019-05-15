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
            this.props.dispatch(OpportunityAction(actionObj))
            this.defaultState = { ...data }
        })
        .catch((err: Error) => console.log(err))
    }
    updateOpportunity(id: string) {
        if(id) {
            const { client } = this.props
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