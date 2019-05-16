import styled from 'styled-components'

const Input = styled.input`
    margin: 10px;
    text-align: center;
    &::-webkit-inner-spin-button,
    &::-webkit-clear-button {
        display: none;
    }
`

export { Input }