import React, {PropTypes} from 'react'
import Details from '../../../shared/components/details'
import controllable from 'react-controllables'
import {
  DatePicker,
} from 'material-ui'

@controllable(['date'])

class AgingSettings extends React.Component {
  render() {
    return (
      <Details  widths={{lg: ['auto', '320px']}}
                rowStyle={{ float: 'left' }}
                cStyles={{lg: [{textAlign: 'left'}]}}
                cStyle={{float: 'left'}}
                data={[
                  { label: 'Date', value: <DatePicker defaultDate={this.props.date}
                              onChange={(e, date) => this.props.onDateChange(date)}
                              hintText="As of"
                              mode="landscape" />, detailType: 'muiDatePicker' }
                ]}
      />
    );
  }
}

AgingSettings.propTypes = {
  date: PropTypes.instanceOf(Date)
};

export default AgingSettings;
