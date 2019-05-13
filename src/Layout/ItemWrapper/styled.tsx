import styled from 'styled-components'

const OpportunitiesWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`
const ItemBlockWrapper = styled.div`
    text-align: center;
    min-width: 320px;
    max-width: 50%;
    box-sizing: border-box;
    border: 1px solid #a1a1a1;
    border-radius: 5px;
    color: #6b6465;
    padding: 7px;
    margin: 8px;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transition: box-shadow 0.6s;
    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
`
const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`
export {
    ContentWrapper,
    ItemBlockWrapper,
    OpportunitiesWrapper
}