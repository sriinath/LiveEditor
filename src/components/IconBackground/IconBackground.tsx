import * as React from 'react'
import { IconBackgroundProps } from './typings'
import { BackgroundElement } from './Styled'

const IconBackground: React.SFC<IconBackgroundProps> = (props) => {
    const { children, ...remainingProps } = props
    return <BackgroundElement {...remainingProps}>{children}</BackgroundElement>
}

export { IconBackground }