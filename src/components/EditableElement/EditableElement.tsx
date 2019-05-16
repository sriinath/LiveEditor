import * as React from 'react'
import { EditableEl } from './styled'
import { EditableElementProps } from '../../typings'

const checkInputValue = (text: string, maxLength: number) => {
    if(text && text.trim().length >= maxLength) {
        return true
    }
    return false
}
// const onInputChange = (e: React.FormEvent<HTMLDivElement>, label: string, maxLength: number, id: string, inputChange: Function) => {
//     const value = e.currentTarget.innerText
//     if(!maxLength || (maxLength && checkInputValue(value, maxLength))) {
//         inputChange(id, label, value)
//     }
//     else {
//         e.preventDefault()
//     }
// }
const EditableElement: React.FC<EditableElementProps> = (props) => {
    const {
        value,
        maxLength,
        inputChange,
        id,
        labelIdentifier
    } = props
    return (
        <EditableEl
            contentEditable={true}
            onKeyDown={e => checkInputValue(e.currentTarget.innerText, maxLength) && e.preventDefault()}
            onBlur={e => inputChange(id, labelIdentifier, e.currentTarget.innerText)}
        >
            {value}
        </EditableEl>
    )
}

export { EditableElement }