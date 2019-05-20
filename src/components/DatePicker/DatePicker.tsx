import * as React from 'react'
import { Input } from './styled'
import { useState } from 'react'

const DatePicker = (props: { value: string, label: string, onChange: (value: string) => void } ) => {
    const { value, onChange, label } = props
    const [ curValue, setValue ] = useState(value)
    return (
        <Input
            type="date"
            value={curValue}
            label={label}
            onChange={e => {
                const newVal = e.currentTarget.value
                setValue(newVal)
                onChange(newVal)
            }}
        />
    )
}

export { DatePicker }