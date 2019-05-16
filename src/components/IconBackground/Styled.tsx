import Styled from 'styled-components'
import { css } from 'styled-components'
import { IconBackgroundProps } from './typings'

const BackgroundElement = Styled.div `
    ${(props: IconBackgroundProps) => css`
        background-color: ${props.backgroundColor || 'transparent'};
        width: ${props.width || 'auto'};
        height: ${props.height || 'auto'};
        border-radius : ${props.isRectangular ? 'none' : '50%'};
    `}
    ${(props: IconBackgroundProps) => props.isFixed ? css`
        position: fixed;
        left: ${props.left || 'auto'};
        right: ${props.right || 'auto'};
        top: ${props.top || 'auto'};
        bottom: ${props.bottom || 'auto'};
    `: css`
        position: relative;
    `}
`

export { BackgroundElement }