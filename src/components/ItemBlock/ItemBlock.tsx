import * as React from 'react'
import { ItemBlockProps } from '../../typings'
import {
    LabelEl,
    EditableElWrapper
} from './styled'
import { EditableElement } from '../EditableElement'
import { DatePicker } from '../DatePicker'

const ItemBlock: React.FC<ItemBlockProps> = (props) => {
    const { isDate, ...remainingProps } = props
    const { label, value } = remainingProps
    return (
        <EditableElWrapper>
            {label ? <LabelEl>{label}</LabelEl> : null}
            {isDate ? <DatePicker value={value} /> : <EditableElement {...remainingProps} />}
        </EditableElWrapper>
    )
}
ItemBlock.defaultProps = {
    isDate: false
}

export { ItemBlock }