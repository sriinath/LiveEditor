interface IconBackgroundProps extends IconPosition {
    backgroundColor?: string
    width?: string
    height?: string
    isRectangular?: boolean
}
interface IconPosition {
    isFixed: boolean
    top?: string
    bottom?: string
    left?: string
    right?: string
}

export {
    IconBackgroundProps,
    IconPosition
}