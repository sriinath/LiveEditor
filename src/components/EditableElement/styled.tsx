import styled from 'styled-components'

const EditableEl = styled.div`
    padding: 5px;
    line-height: 20px;
    font-size: 16px;
    cursor: initial;
    border-bottom: 1px solid #dadce0;
    margin: 10px;
    color: #555;
    &:empty::before {
        content: ${(props: { label: string }) => props.label || ''};
    }
`

export {
    EditableEl,
}