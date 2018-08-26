import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RcCalendar from 'rc-calendar'
import 'rc-calendar/assets/index.css'
import moment from 'moment'
import fr from 'rc-calendar/lib/locale/fr_FR'
import TimePickerPanel from 'rc-time-picker/lib/Panel'
import 'rc-time-picker/assets/index.css'

class Calendar extends Component {
  constructor (props) {
    super(props)

    const date = moment().add(2, 'days')
    date.hour(0)
    date.minute(0)
    date.second(0)
    date.locale('fr')

    this.state = {
      defaultSelectedValue: date,
      showDateInput: true,
      showTime: true,
      mode: props.mode,
      eventsList: props.eventsList,
      dafaultHour: null,
      dateSelected: null
    }
    moment.locale('fr')
    this.onSelect = this.onSelect.bind(this)
    this.disabledTime = this.disabledTime.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.mode !== this.state.mode) {
      this.setState({mode: nextProps.mode})
      this.props.resetChangeDate()
    }
  }

  onSelect (date) {
    var eventList = this.props.eventsList
    var initDisabledHour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 19, 20, 21, 22, 23, 24]
    var setDefaultHour = []
    if (date === null) {
      this.setState({
        showTime: false,
        mode: 'date'
      })
    } else {
      var disabledHour = []
      eventList.map((event) => {
        var dateEvent = moment(event.start)
        if (dateEvent.format('MMMM Do YYYY') === date.format('MMMM Do YYYY')) {
          if (disabledHour.indexOf(dateEvent.hour()) === -1) {
            disabledHour.push(dateEvent.hour())
          }
        }
      })
      disabledHour.map((hour) => {
        if (initDisabledHour.indexOf(hour) === -1) {
          initDisabledHour.push(hour)
        }
      })

      for (var i = 0; i <= 24; i++) {
        if (initDisabledHour.indexOf(i) === -1) {
          setDefaultHour.push(i)
        }
      }

      if (setDefaultHour.indexOf(date.hour()) !== -1) {
        this.props.changeDate(date, 'time')
        this.setState({
          showTime: true,
          mode: 'time'
        })
      } else {
        this.props.changeDate(date, 'time')
        this.setState({
          showTime: true,
          mode: 'time'
        })
        this.props.selectTime(date)
      }
    }
  }

  disabledDate (current) {
    if (!current) {
      return false
    }

    var disabledHour = []

    if (this.props.eventsList) {
      this.props.eventsList.map((event) => {
        var dateEvent = moment(event.start)
        if (dateEvent.format('MMMM Do YYYY') === current.format('MMMM Do YYYY')) {
          if (disabledHour.indexOf(dateEvent.hour()) === -1) {
            disabledHour.push(dateEvent.hour())
          }
        }
      })
    }

    const date = moment().add(1, 'days')
    date.hour(0)
    date.minute(0)
    date.second(0)
    return current.valueOf() < date.valueOf() || current.day() === 0 || current.day() === 6 || disabledHour.length >= 4 // can not select days before today
  }

  disabledTime (date) {
    var eventList = this.props.eventsList
    var initDisabledHour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 19, 20, 21, 22, 23, 24]
    if (date) {
      var disabledHour = []
      eventList.map((event) => {
        var dateEvent = moment(event.start)
        if (dateEvent.format('MMMM Do YYYY') === date.format('MMMM Do YYYY')) {
          if (disabledHour.indexOf(dateEvent.hour()) === -1) {
            disabledHour.push(dateEvent.hour())
          }
        }
      })
      disabledHour.map((hour) => {
        if (initDisabledHour.indexOf(hour) === -1) {
          initDisabledHour.push(hour)
        }
      })
    }
    return {
      disabledHours () {
        return initDisabledHour
      }
    }
  }

  render () {
    return (
      <RcCalendar
        locale={fr}
        mode={this.state.mode}
        onSelect={this.onSelect}
        disabledTime={this.state.showTime ? this.disabledTime : null}
        disabledDate={this.disabledDate}
        showOk={false}
        showToday={false}
        showDateInput={false}
        timePicker={this.state.showTime ? <TimePickerPanel hideDisabledOptions showMinute={false} defaultValue={moment('00:00', 'HH:mm')} showSecond={false} /> : null}
      />
    )
  }
}

Calendar.propTypes = {
  mode: PropTypes.string,
  eventsList: PropTypes.array,
  resetChangeDate: PropTypes.func,
  changeDate: PropTypes.func,
  selectTime: PropTypes.func
}

export default Calendar
