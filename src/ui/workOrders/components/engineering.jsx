import React from 'react'
import Settings from '../../shared/components/settings'
import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
import {
  RadioButtonGroup,
  RadioButton,
  Checkbox,
  FlatButton,
  RaisedButton,
  FloatingActionButton,
  IconButton,
  Toggle,
  Slider,
  DropDownMenu,
  DatePicker,
  TextField,
  Paper
} from 'material-ui'

import _ from 'lodash'
import controllable from 'react-controllables'

@controllable([
  'circuitProvisionedInAmple',
  'provisioningNotified',
  'swipCompleted',
  'orionMonitored'
])

class EngineeringView extends React.Component {

  style() {
    return {}
  }

  submit() {
    this.props.onSubmit(this.props)
  }

  render() {
    return (
      <div style={this.props.style}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{lg:[12],md:[12],sm:[12],xs:[12]}} pPadding={'0 20px 20px 20px'}>
            <div>
              <Details title={'Engineering'}
                data = {[
                  { label: '', value:<Layout widths={{}}>
                                        <Checkbox name={'circuit_provisioned_in_ample'} label={'Circuit Built in AMPLE'} defaultChecked={this.props.circuitProvisionedInAmple}/>
                                        <Checkbox name={'provisioning_notified'} label={'Provisioning Notified'} defaultChecked={this.props.provisioningNotified} />
                                        <Checkbox name={'swip_completed'} label={'SWIP Completed'} defaultChecked={this.props.swipCompleted} />
                                        <Checkbox name={'orion_monitored'} label={'Monitored in Orion'} defaultChecked={this.props.orionMonitored} />
                                      </Layout>, detailType: 'muiTextField' },
                  { label: '', value:<RaisedButton onClick={() => this.submit()} primary label="Update" />, detailType: 'muiButton' }
                ]}
              />
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
}

class Engineering extends React.Component {

  handleSubmit(state) {
    console.log(state);
  }

  render() {
    return <EngineeringView onSubmit={(state) => handleSubmit(state)}
                            defaultCircuitProvisionedInAmple={this.props.workOrder.circuit_provisioned_in_ample}
                            defaultProvisioningNotified={this.props.workOrder.provisioning_notified}
                            defaultSwipCompleted={this.props.workOrder.swip_completed}
                            defaultOrionMonitored={this.props.workOrder.orion_monitored} />
  }
}

export default Engineering;
