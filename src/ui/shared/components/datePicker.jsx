import React from 'react'
import Settings from './settings'
import _ from 'lodash'
import {
  DatePicker
} from 'material-ui'

let DatePickerWrapper = React.createClass({
  handleChange(ev) {
    this.props.valueLink.requestChange(this.refs.datepicker.getDate());
  },
  render() {
    let date = new Date(this.props.valueLink.value);
    if (isNaN(date.getMonth()))
      date = undefined;
    return <DatePicker ref="datepicker"
                       //{...this.props}
                       onChange={this.handleChange}
                       defaultDate={date}/>;
  }
});

export default DatePickerWrapper;
