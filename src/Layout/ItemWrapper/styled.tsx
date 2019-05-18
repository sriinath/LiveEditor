import styled from 'styled-components'
import {
    BackgroundElement
} from '../../components'

const OpportunitiesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    margin: auto;
    width: 75%;
    @media (max-width: 768px) {
        width: 100%;
    }
    ${BackgroundElement} {
        display: none;
    }
    &:hover {
        ${BackgroundElement} {
            display: block;
            &:hover {
                background-color: #fff;
            }
            margin: 20px auto;                
        }
    }
`
const ItemBlockWrapper = styled.div`
    background-color: #172b3a;
    text-align: center;
    min-width: 230px;
    max-width: 290px;
    box-sizing: border-box;
    border: 1px solid #a1a1a1;
    border-radius: 5px;
    color: #6b6465;
    padding: 7px;
    margin: 8px;
    cursor: pointer;
    transition: box-shadow 0.6s;
    &:hover {
        box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12)
    }
`
const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`
const ApplyIcon = styled.div`
    font-family: 'FontAwesome';
    font-size: 25px;
    font-weight: bold;
    line-height: 40px;
    color: #fff;
    &::before {
        content: '\f00c';
    }
    &:hover {
        color: #27ae60;
    }
`
export {
    ContentWrapper,
    ItemBlockWrapper,
    OpportunitiesWrapper,
    ApplyIcon
}