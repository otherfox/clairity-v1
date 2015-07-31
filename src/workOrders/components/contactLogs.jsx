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
  'customerContactId',
  'technicalContactId',
  'voiceContactId',
  'siteContactId'
])

class ContactLogsView extends React.Component {

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
              <Details title={'Contact Logs'}
                data = {[
                  { label: 'Customer', value: <div className={'full'}><TextField multiLine={true} defaultValue={this.props.customerContactId}/></div>, detailType: 'muiTextField' },
                  { label: 'Technical', value: <div className={'full'}><TextField multiLine={true} defaultValue={this.props.technicalContactId}/></div>, detailType: 'muiTextField' },
                  { label: 'Voice', value: <div className={'full'}><TextField multiLine={true} defaultValue={this.props.voiceContactId}/></div>, detailType: 'muiTextField' },
                  { label: 'Site', value: <div className={'full'}><TextField multiLine={true} defaultValue={this.props.siteContactId}/></div>, detailType: 'muiTextField' },
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

class ContactLogs extends React.Component {
  handleSubmit(state) {
    console.log(state);
  }

  render() {
    return <ContactLogsView onSubmit={state => this.handleSubmit(state)}
                            defaultCustomerContactId={this.props.workOrder.customer_contact_id}
                            defaultTechnicalContactId={this.props.workOrder.technical_contact_id}
                            defaultVoiceContactId={this.props.workOrder.voice_contact_id}
                            defaultSiteContactId={this.props.workOrder.site_contact_id}
    />
  }
}

export default ContactLogs;
