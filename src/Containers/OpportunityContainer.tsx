import * as React from 'react'
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
    updatePostBody: any = {}
    componentDidMount() {
        const { client } = this.props
        // Graphql query is made and the response is stored
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
        const { data } = this.props
        // let UpdatedOpportunityStore: OpportunitiesData = {
        //     opportunities: []
        // }
        data.map((opportunity: OpportunitiesProps) => {
            if(opportunity && opportunity.id === id) {
                if(label && value) {
                    let updatedStoreData: any = { ...opportunity }
                    let temp_opportunity: any = {}
                    if(updatedStoreData[label] !== value) {
                        updatedStoreData[label] = value
                        updatedStoreData.updateAvailable = true
                        if(this.updatePostBody[id]) {
                            temp_opportunity = this.updatePostBody[id].opportunity && { ...this.updatePostBody[id].opportunity } || {}
                            temp_opportunity[label] = value   
                        }
                        else {
                            this.updatePostBody[id] = {}    
                        }
                        this.updatePostBody[id].opportunity = temp_opportunity
                    }
                    else if(updatedStoreData[label] === value) {
                        if(this.updatePostBody && this.updatePostBody[id]) {
                            let OpportunityPostBody = this.updatePostBody[id].opportunity
                            if(OpportunityPostBody) {
                                if(OpportunityPostBody[label]) {
                                  delete OpportunityPostBody[label]
                                }
                                if(!Object.keys(OpportunityPostBody).length) {
                                    updatedStoreData.updateAvailable = false
                                    delete this.updatePostBody[id]
                                }
                            }
                        }
                    }
                    // UpdatedOpportunityStore.opportunities.push(updatedStoreData)
                }
            }
            else {
                // UpdatedOpportunityStore.opportunities.push(opportunity)
            }
        })
        // let actionObj = {
        //     type: 'Opportunity',
        //     data: UpdatedOpportunityStore
        // }
        console.log(this.updatePostBody)
        // this.props.dispatch(OpportunityAction(actionObj))
        // const UpdatedOpportunity = data.filter((opportunity: OpportunitiesProps) => opportunity.id === id)
    }
    render() {
        const { data, children } = this.props
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