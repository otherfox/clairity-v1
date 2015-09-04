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

@controllable([ 'voiceServicesAccepted',
                'circuitInstalledAndTested',
                'ethernetErrorsChecked',
                'voiceInstalledAndTested',
                'voiceServicesAccepted',
                'hardwareNotes',
                'rss'
              ])

class InstallationView extends React.Component {

  style() {
    return {}
  }

  submit() {
    this.props.onSubmit(this.props)
  }

  render() {
    return (
      <div style={_.assign(this.style(), this.props.style)}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{lg:[12],md:[12],sm:[12],xs:[12]}} pPadding={'0 20px 20px 20px'}>
            <div>
              <Details title={'Installation'}
                data = {[
                  { label: '', value: <Layout widths={{lg: [12,12,12], md: [12,12,12], sm: [12,12,12], xs: [12,12,12]}}>
                                        <Checkbox label={'Circuit Installed and Tested'} defaultChecked={this.props.circuitServicesInstalledAndTested}/>
                                        <Checkbox label={'Ethernet Errors Checked'} defaultChecked={this.props.ethernetErrorsChecked}/>
                                        <Checkbox label={'Circuit Accepted'} defaultChecked={this.props.circuitAccepted}/>
                                        <Checkbox label={'Voice Installed and Tested'} defaultChecked={this.props.voiceInstalledAndTested} />
                                        <Checkbox label={'Voice Services Accepted'} defaultChecked={this.props.voiceServicesAccepted} />
                                      </Layout>, detailType: 'muiTextField' },
                  { label: 'RSS', name: 'rss', value: <TextField multiLine={true} defaultValue={this.props.rss}/>, detailType: 'muiTextField' },
                  { label: 'Notes', name: 'hardware_notes', value: <TextField multiLine={true} defaultValue={this.props.hardwareNotes} />, detailType: 'muiTextField' },
                  { label: '', value:<RaisedButton onClick={() => this.refs.pop.submit()} primary label="Update" />, detailType: 'muiButton' }
                ]}
              />
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
}

class Installation extends React.Component {
  handleSubmit(state) {
    console.log(state);
    // updateWorkOrder({
    //   id: this.props.workOrder.id,
    //   workOrder: _.extend({}, this.props.workOrder, {pop_entry: 'existing', pop_id: this.state.popId})
    // });
  }

  render() {
    return (
      <InstallationView onSubmit={(state) => this.handleSubmit(state)}
                        defaultVoiceInstalledAndTested={this.props.workOrder.voice_installed_and_tested}
                        defaultVoiceServicesAccepted={this.props.workOrder.voice_services_accepted}
                        defaultCircuitInstalledAndTested={this.props.workOrder.circuit_installed_and_tested}
                        defaultEthernetErrorsChecked={this.props.workOrder.ethernet_errors_checked}
                        defaultHardwareNotes={this.props.workOrder.hardware_notes}
                        defaultRss={this.props.workOrder.rss} />
    );
  }
}

export default Installation;
