import * as React from 'react'
import {
    ItemBlockWrapper,
    OpportunitiesWrapper,
    ContentWrapper,
    ApplyIcon
} from './styled'
import {
    EditableElement,
    ItemBlock,
    IconBackground
} from '../../components'
import { OpportunitiesConsumer } from '../../Contexts'
import * as moment from 'moment'

const renderBackgroundOpportunities = (backgrounds: {name: string}[]) => {
    let backgroundText = ''
    backgrounds && backgrounds.length && backgrounds.map(background => {
        backgroundText += background.name
    })
    return backgroundText
}
const renderApplyButton = (id: string, clickHandler: any) => {
    return (
        <IconBackground
            isFixed={false}
            width='40px'
            height='40px'
            backgroundColor='#27ae60'
            isRectangular={false}
        >
            <ApplyIcon
                data-id={id}
                onClick={e => clickHandler(e.currentTarget.getAttribute('data-id'))}
            />
        </IconBackground>
    )
}
const getDate = (date: string) => {
    let curDate = new Date(date) 
    let momentDate = moment(curDate)
    return momentDate.format('YYYY-MM-DD')
}

const ItemWrapper = () => {
    return (
        <OpportunitiesWrapper>
            <OpportunitiesConsumer>
                {opportunityData => opportunityData.data.map((opportunity, index) => <ItemBlockWrapper key={index}>
                        <EditableElement id={opportunity.id} labelIdentifier="title" value={opportunity.title} maxLength={100} inputChange={opportunityData.updateValue} />
                        <EditableElement id={opportunity.id} value={opportunity.description} labelIdentifier="description" inputChange={opportunityData.updateValue} />
                        <ContentWrapper>
                            <ItemBlock isDate={true} id={opportunity.id} value={getDate(opportunity.earliest_start_date)} label="Start Date" labelIdentifier="earliest_start_date" inputChange={opportunityData.updateValue} />
                            <ItemBlock isDate={true} id={opportunity.id} value={getDate(opportunity.latest_end_date)} label="End Date" labelIdentifier="latest_end_date" inputChange={opportunityData.updateValue} />
                        </ContentWrapper>
                        <ItemBlock isDate={true} id={opportunity.id} value={getDate(opportunity.applications_close_date)} label="Application Close Date" labelIdentifier="applications_close_date" inputChange={opportunityData.updateValue} />
                        <ItemBlock id={opportunity.id} value={renderBackgroundOpportunities(opportunity.backgrounds)} label="Backgrounds" labelIdentifier="backgrounds" inputChange={opportunityData.updateValue} />
                        <ItemBlock id={opportunity.id} value={opportunity.selection_process} label="Selection process" labelIdentifier="selection_process" inputChange={opportunityData.updateValue} />
                        <ItemBlock id={opportunity.id} value={opportunity.salary} label="Salary" labelIdentifier="salary" inputChange={opportunityData.updateValue} />
                        <ItemBlock id={opportunity.id} value={opportunity.city} labelIdentifier="city" label="City" inputChange={opportunityData.updateValue} />
                        {opportunity.updateAvailable ? renderApplyButton(opportunity.id, opportunityData.applyOpportunityChanges) : ''}
                    </ItemBlockWrapper>
                )}
            </OpportunitiesConsumer>
        </OpportunitiesWrapper>
    )
}

export { ItemWrapper }