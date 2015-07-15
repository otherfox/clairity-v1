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
    return <DatePicker ref="datepicker"
                       {...this.props}
                       onChange={this.handleChange}
                       defaultDate={this.props.valueLink.value} />;
  }
});

export default DatePickerWrapper;
