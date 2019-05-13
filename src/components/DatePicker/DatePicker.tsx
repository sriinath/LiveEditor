import * as React from 'react'
import ReactDatePicker from 'react-datepicker'
import { useState } from 'react'

const DatePicker = (props: { value: string } ) => {
    const { value } = props
    const [ curValue, setValue ] = useState(new Date(value))
    return (
        <ReactDatePicker
            selected={curValue}
            onChange={(value) => setValue(value)}
        />
    )
}

export { DatePicker }