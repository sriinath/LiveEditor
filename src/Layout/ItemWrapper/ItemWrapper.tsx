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
    return backgrounds.map((background, index) => {
        // return index === 0 ? <ItemBlock key={index} id={opportunity.id} value={background.name} label="backgrounds" />
        // : ',' + <EditableElement key={index} value={background.name} id={opportunity.id} />
    })
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
                        <EditableElement label="title" id={opportunity.id} value={opportunity.title} maxLength={100} inputChange={opportunityData.updateValue} />
                        <EditableElement label="description" id={opportunity.id} value={opportunity.description} inputChange={opportunityData.updateValue} />
                        <ContentWrapper>
                            <ItemBlock isDate={true} id={opportunity.id} value={opportunity.earliest_start_date} label="Start Date" inputChange={opportunityData.updateValue} />
                            <ItemBlock isDate={true} id={opportunity.id} value={opportunity.latest_end_date} label="End Date" inputChange={opportunityData.updateValue} />
                        </ContentWrapper>
                        <ItemBlock isDate={true} id={opportunity.id} value={opportunity.applications_close_date} label="Application Close Date" inputChange={opportunityData.updateValue} />
                        {renderBackgroundOpportunities(opportunity.backgrounds)}
                        <ContentWrapper>
                            <ItemBlock id={opportunity.id} value={opportunity.selection_process} label="Selection process" inputChange={opportunityData.updateValue} />
                            <ItemBlock id={opportunity.id} value={opportunity.salary} label="Salary" inputChange={opportunityData.updateValue} />
                        </ContentWrapper>
                        <ItemBlock id={opportunity.id} value={opportunity.city} label="City" inputChange={opportunityData.updateValue} />
                    </ItemBlockWrapper>
                )}
            </OpportunitiesConsumer>
        </OpportunitiesWrapper>
    )
}

export { ItemWrapper }