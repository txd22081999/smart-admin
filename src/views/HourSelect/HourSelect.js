import React, { useState, useEffect } from 'react'
import TimePicker from 'react-time-picker'

import './HourSelect.scss'

const HourSelect = (props) => {
  const {
    dayValue,
    day = 'Thứ 2',
    open = '09:00',
    close = '14:00',
    handleOpenTimeChange,
    handleCloseTimeChange,
  } = props
  const [openHour, setOpenHour] = useState(open)
  const [closeHour, setCloseHour] = useState(close)

  useEffect(() => {
    handleOpenTimeChange(open, dayValue)
    handleCloseTimeChange(close, dayValue)
  }, [])

  const onOpenTimeChange = (time) => {
    setOpenHour(time)
    handleOpenTimeChange(time, dayValue)
  }

  const onCloseTimeChange = (time) => {
    setCloseHour(time)
    handleCloseTimeChange(time, dayValue)
  }

  return (
    <div className='time-picker-container'>
      <div className='time-picker-wrapper'>
        <div>
          <span className='day'>{day}</span>
          <span className='time-picker-label'>Giờ mở</span>
          <TimePicker onChange={onOpenTimeChange} value={openHour} />
        </div>

        <div>
          <span className='time-picker-label'>Giờ đóng</span>
          <TimePicker onChange={onCloseTimeChange} value={closeHour} />
        </div>
      </div>
    </div>
  )
}

export default HourSelect
