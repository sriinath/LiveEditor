import * as React from 'react'
import { EditableEl } from './styled'
import { EditableElementProps } from '../../typings'

const checkInputValue = (text: string, maxLength: number) => {
    if(text && text.trim().length >= maxLength) {
        return true
    }
    return false
}
const EditableElement: React.FC<EditableElementProps> = (props) => {
    const {
        value,
        maxLength,
        inputChange,
        id,
        label,
        labelIdentifier
    } = props
    return (
        <EditableEl
            contentEditable={true}
            onKeyDown={e => checkInputValue(e.currentTarget.innerText, maxLength) && e.preventDefault()}
            onBlur={e => inputChange(id, labelIdentifier, e.currentTarget.innerText)}
            label={label}
        >
            {value}
        </EditableEl>
    )
}

export { EditableElement }