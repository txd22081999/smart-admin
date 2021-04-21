import React, { Fragment } from 'react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import TimeRangeSlider from 'react-time-range-slider'

const sliderHandle = (props) => {
  const { value, dragging, index, offset, ...restProps } = props
  const positionStyle = {
    position: 'absolute',
    left: `${offset}%`,
  }
  return (
    <Fragment key={index}>
      <div className='rc-slider-tooltip' style={positionStyle}>
        {'$' + value}
      </div>
      <Slider.Handle value={value} offset={offset} {...restProps} />
    </Fragment>
  )
}

export class SliderTooltip extends React.Component {
  render() {
    return <Slider handle={this.props.handle || sliderHandle} {...this.props} />
  }
}

export class RangeTooltip extends React.Component {
  render() {
    return <Range handle={this.props.handle || sliderHandle} {...this.props} />
  }
}
export class TimeRange extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: {
        start: this.props.minValue,
        end: this.props.maxValue,
      },
    }
  }

  timeChangeHandler = (time) => {
    console.log(time)
    this.setState({
      value: time,
    })
  }

  render() {
    const {
      changeStartHandler,
      changeCompleteHandler,
      changeHandler,
      step,
      minValue,
      maxValue,
    } = this.props
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{this.state.value.start}</span>
          <span>{this.state.value.end}</span>
        </div>
        <TimeRangeSlider
          disabled={false}
          format={24}
          minValue={minValue || '00:00'}
          maxValue={maxValue || '23:59'}
          name={'time_range'}
          onChangeStart={changeStartHandler}
          onChangeComplete={changeCompleteHandler}
          onChange={this.timeChangeHandler}
          step={step || 15}
          value={this.state.value}
        />
      </>
    )
    // return <Range handle={this.props.handle || sliderHandle} {...this.props} />
  }
}
