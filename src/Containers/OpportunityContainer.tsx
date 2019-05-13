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

class OpportunityContainer extends React.Component<any> {
    constructor(props: any) {
        super(props)
        this.updateData = this.updateData.bind(this)
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
        })
        .catch((err: Error) => console.log(err))
    }
    updateData(id: string, label: string, value: string) {
        // const { data } = this.props
        // Temporary state object
        let UpdatedOpportunityStore: OpportunitiesData = {
            opportunities: []
        }
        // loop over the initial response data and check whether data is updated
        this.defaultState.map((opportunity: OpportunitiesProps) => {
            if(opportunity && opportunity.id === id) {
                if(label && value) {
                    let currentOpportunity: any = { ...opportunity }
                    //  data is different from the initial state
                    if(currentOpportunity[label] !== value) {
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
                    else if(currentOpportunity[label] === value) {
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
        this.defaultState = data
        const providerValue = {
            data,
            updateValue: this.updateData
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