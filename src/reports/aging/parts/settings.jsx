import React, {PropTypes} from 'react'
import Filters from '../../../shared/components/filters'
import controllable from 'react-controllables'
import {
  RadioButton,
  RadioButtonGroup,
  Checkbox,
  RaisedButton,
  DatePicker,
} from 'material-ui'

@controllable(['status', 'nonzero', 'date'])
class AgingSettings extends React.Component {
  render() {
    return (
      <Filters>
        <RadioButtonGroup name="status"
                          valueSelected={this.props.status}
                          onChange={(e, status) => this.props.onStatusChange(status)}>
          <RadioButton value="active" label="Active" />
          <RadioButton value="inactive" label="Inactive" />
          <RadioButton value="both" label="Both" />
        </RadioButtonGroup>
        <Checkbox checked={this.props.nonzero}
                  onCheck={(e, nonzero) => this.props.onNonzeroChange(nonzero)}
                  label="Hide $0 Credit Balances" />
        <DatePicker defaultDate={this.props.date}
                    onChange={(e, date) => this.props.onDateChange(date)}
                    hintText="As of"
                    mode="landscape" />
      </Filters>
    );
  }
}

AgingSettings.propTypes = {
  status: PropTypes.oneOf(['active', 'inactive', 'both']).isRequired,
  nonzero: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date)
};

export default AgingSettings;
