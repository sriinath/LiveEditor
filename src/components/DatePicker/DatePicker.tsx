import * as React from 'react'
import { Input } from './styled'
import { useState } from 'react'

const DatePicker = (props: { value: string } ) => {
    const { value } = props
    const [ curValue, setValue ] = useState(value)
    return (
        <Input type="date" value={curValue} onChange={e => setValue(e.currentTarget.value)} />
    )
}

export { DatePicker }