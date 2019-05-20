import * as React from 'react'
import {
    ItemBlockWrapper,
    OpportunitiesWrapper,
    ContentWrapper,
    ApplyIcon,
    BackgroundWrapper,
    BackgroundEl,
    ElWrapper,
    ErrorEl
} from './styled'
import {
    EditableElement,
    ItemBlock,
    LabelEl,
    IconBackground
} from '../../components'
import {
    Background
} from '../../typings'
import { OpportunitiesConsumer } from '../../Contexts'
import * as moment from 'moment'

const renderBackgroundOpportunities = (backgrounds: Background[], backgroundsData: Background[]) => {
    let disableBackgrounds = false
    if(backgroundsData && backgroundsData.length) {
        let tempBackgroundsData: Background[] = []
        let backgroundDataLen = 0
        tempBackgroundsData = [
            ...backgroundsData
        ]
        if(backgrounds) {
            if(backgrounds.length > 2) {       
                disableBackgrounds = true
            }
            backgroundDataLen = backgrounds.length
        }
        return (
            <BackgroundWrapper>
                <LabelEl>Backgrounds</LabelEl>
                {
                    tempBackgroundsData.map((background, index) => {
                        for(let i = 0; i < backgroundDataLen; i++) {
                            if(backgroundsData[i] && backgroundsData[i].name && background && background.name) {
                                return <BackgroundEl selected={true} key={index}>{background.name}</BackgroundEl>
                            }
                        }
                        return <BackgroundEl disable={disableBackgrounds} key={index}>{background.name}</BackgroundEl>
                    })
                }
            </BackgroundWrapper>
        )
    }
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
                        <ElWrapper>
                            <EditableElement id={opportunity.id} labelIdentifier="title" value={opportunity.title} maxLength={100} inputChange={opportunityData.updateValue} />
                            {opportunity.errors && opportunity.errors.title ? <ErrorEl>{opportunity.errors.title}</ErrorEl>: ''}
                        </ElWrapper>
                        <ElWrapper>
                            <EditableElement id={opportunity.id} value={opportunity.description} labelIdentifier="description" inputChange={opportunityData.updateValue} />
                            {opportunity.errors && opportunity.errors.description ? <ErrorEl>{opportunity.errors.description}</ErrorEl>: ''}
                        </ElWrapper>
                        <ElWrapper>
                            <ContentWrapper>
                                <ItemBlock isDate={true} id={opportunity.id} value={getDate(opportunity.earliest_start_date)} label="Start Date" labelIdentifier="earliest_start_date" inputChange={opportunityData.updateValue} />
                                <ItemBlock isDate={true} id={opportunity.id} value={getDate(opportunity.latest_end_date)} label="End Date" labelIdentifier="latest_end_date" inputChange={opportunityData.updateValue} />
                                {opportunity.errors && opportunity.errors.earliest_start_date ? <ErrorEl>{opportunity.errors.earliest_start_date}</ErrorEl>: ''}
                                {opportunity.errors && opportunity.errors.latest_end_date ? <ErrorEl>{opportunity.errors.latest_end_date}</ErrorEl>: ''}
                            </ContentWrapper>
                        </ElWrapper>
                        <ElWrapper>
                            <ItemBlock isDate={true} id={opportunity.id} value={getDate(opportunity.applications_close_date)} label="Application Close Date" labelIdentifier="applications_close_date" inputChange={opportunityData.updateValue} />
                            {opportunity.errors && opportunity.errors.applications_close_date ? <ErrorEl>{opportunity.errors.applications_close_date}</ErrorEl>: ''}
                         </ElWrapper>
                        <ElWrapper>
                            {renderBackgroundOpportunities(opportunity.backgrounds, opportunity.backgroundsData)}
                            {opportunity.errors && opportunity.errors.backgrounds ? <ErrorEl>{opportunity.errors.backgrounds}</ErrorEl>: ''}
                        </ElWrapper>    
                        <ElWrapper>
                            <ItemBlock id={opportunity.id} value={opportunity.selection_process} label="Selection process" labelIdentifier="selection_process" inputChange={opportunityData.updateValue} />
                            {opportunity.errors && opportunity.errors.selection_process ? <ErrorEl>{opportunity.errors.selection_process}</ErrorEl>: ''}
                        </ElWrapper>
                        <ElWrapper>
                            <ItemBlock id={opportunity.id} value={opportunity.salary} label="Salary" labelIdentifier="salary" inputChange={opportunityData.updateValue} />
                            {opportunity.errors && opportunity.errors.salary ? <ErrorEl>{opportunity.errors.salary}</ErrorEl>: ''}
                        </ElWrapper>
                        <ElWrapper>
                            <ItemBlock id={opportunity.id} value={opportunity.city} labelIdentifier="city" label="City" inputChange={opportunityData.updateValue} />
                            {opportunity.errors && opportunity.errors.city ? <ErrorEl>{opportunity.errors.city}</ErrorEl>: ''}
                        </ElWrapper>
                        {opportunity.updateAvailable ? renderApplyButton(opportunity.id, opportunityData.applyOpportunityChanges) : ''}
                    </ItemBlockWrapper>
                )}
            </OpportunitiesConsumer>
        </OpportunitiesWrapper>
    )
}

export { ItemWrapper }