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
    const { id, label, value, inputChange } = remainingProps
    return (
        <EditableElWrapper>
            {label ? <LabelEl>{label}</LabelEl> : null}
            {isDate ? <DatePicker label={label} value={value} onChange={value => inputChange(id, label, value)} /> : <EditableElement {...remainingProps} />}
        </EditableElWrapper>
    )
}
ItemBlock.defaultProps = {
    isDate: false
}

export { ItemBlock }