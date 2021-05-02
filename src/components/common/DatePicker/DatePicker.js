import React, { useState } from 'react'
import { FormGroup, FormText, Label } from 'reactstrap'
import DatePicker from 'reactstrap-date-picker'

import './DatePicker.scss'

const DatePickerBasic = (props) => {
  const { onDateChange, format, value: valueProp } = props
  const inputName = 'reactstrap_date_picker_basic'
  //   const [value, setValue] = useState('1999-01-01T00:00:00.000Z')
  const [value, setValue] = useState(
    `${valueProp || '1999-01-01'}T00:00:00.000Z`
    // `${valueProp}T00:00:00.000Z`
  )
  const [fmtValue, setFmtValue] = useState('2019-06-01')

  return (
    <FormGroup>
      {/* <Label for={inputName} className='valium-reactstrap-label'>
        {'Basic'}
      </Label> */}
      <DatePicker
        name={inputName}
        instanceCount={1}
        value={value}
        dateFormat={format}
        onChange={(v, f) => {
          setValue(v)
          setFmtValue(f)
          onDateChange(v, f)
        }}
      />
      {/* <FormText>
        Format: Year-Month-Day
      </FormText> */}
    </FormGroup>
  )
}

export default DatePickerBasic
