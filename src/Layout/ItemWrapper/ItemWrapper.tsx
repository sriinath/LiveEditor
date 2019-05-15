import * as React from 'react'
import {
    ItemBlockWrapper,
    OpportunitiesWrapper,
    ContentWrapper
} from './styled'
import {
    EditableElement,
    ItemBlock
} from '../../components'
import { OpportunitiesConsumer } from '../../Contexts'
import * as moment from 'moment'
const renderBackgroundOpportunities = (backgrounds: {name: string}[]) => {
    let backgroundText = ''
    backgrounds && backgrounds.length && backgrounds.map(background => {
        return  (backgroundText + background.name)
    })
    return backgroundText
}
const getDate = (date: string) => {
    let curDate = new Date(date) 
    let momentDate = moment(curDate)
    return momentDate.format('MMM DD YYYY')
}
const ItemWrapper = () => {
    return (
        <OpportunitiesWrapper>
            <OpportunitiesConsumer>
                {opportunityData => opportunityData.data.map((opportunity, index) => <ItemBlockWrapper key={index}>
                        <EditableElement id={opportunity.id} labelIdentifier="title" value={opportunity.title} maxLength={100} inputChange={opportunityData.updateValue} />
                        <EditableElement id={opportunity.id} value={opportunity.description} labelIdentifier="description" inputChange={opportunityData.updateValue} />
                        <ContentWrapper>
                            <ItemBlock isDate={true} id={opportunity.id} value={opportunity.earliest_start_date} label="Start Date" labelIdentifier="earliest_start_date" inputChange={opportunityData.updateValue} />
                            <ItemBlock isDate={true} id={opportunity.id} value={opportunity.latest_end_date} label="End Date" labelIdentifier="latest_end_date" inputChange={opportunityData.updateValue} />
                        </ContentWrapper>
                        <ItemBlock isDate={true} id={opportunity.id} value={opportunity.applications_close_date} label="Application Close Date" labelIdentifier="applications_close_date" inputChange={opportunityData.updateValue} />
                        <ItemBlock isDate={true} id={opportunity.id} value={renderBackgroundOpportunities(opportunity.backgrounds)} label="Backgrounds" labelIdentifier="backgrounds" inputChange={opportunityData.updateValue} />
                        <ContentWrapper>
                            <ItemBlock id={opportunity.id} value={opportunity.selection_process} label="Selection process" labelIdentifier="selection_process" inputChange={opportunityData.updateValue} />
                            <ItemBlock id={opportunity.id} value={opportunity.salary} label="Salary" labelIdentifier="salary" inputChange={opportunityData.updateValue} />
                        </ContentWrapper>
                        <ItemBlock id={opportunity.id} value={opportunity.city} labelIdentifier="city" label="City" inputChange={opportunityData.updateValue} />
                        {opportunity.updateAvailable ? <div data-id={opportunity.id} onClick={e => opportunityData.applyOpportunityChanges(e.currentTarget.getAttribute('data-id'))} >apply</div> : ''}
                    </ItemBlockWrapper>
                )}
            </OpportunitiesConsumer>
        </OpportunitiesWrapper>
    )
}

export { ItemWrapper }