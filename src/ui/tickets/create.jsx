import React, { Component, PropTypes } from 'react'
import {
  TextField,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  Paper
} from 'material-ui'
import Details from '../shared/components/details'
import DetailRow from '../shared/components/details/detailRow'
import DropDown from '../shared/components/dropDown'
import Header from '../shared/components/header'
import Layout from '../shared/components/layout'
import async, { action } from '../shared/components/async'
import controllable from 'react-controllables'
import { v4 } from 'uuid'

@controllable([
  'template',
  'status',
  'priority',
  'assign',
  'callInTicket',
  'caller',
  'subject',
  'body',
  'people',
  'includesCustomer'
])
@async({ createTicket: action() })
class CreateTicket extends Component {
  createTicket() {
    console.log(this.props);
    // this.props.actions.createTicket(this.props)
  }
  newCaller() {}
  searchCallers() {}
  findPerson() {}
  createPerson() {}
  deletePerson() {}
  render() {
    let ticketId = v4();
    return (
      <Layout widths={{}} cPadding='20px 20px 0 0'>
        <Header>
          <h1>Create Ticket</h1>
        </Header>
        <Paper>
          <Layout widths={{lg: [12, 6, 6]}} cPadding='10px 0 30px 0' pPadding='0 0 20px 0'>
            <Details>
              <DetailRow rowStyle={{ width: 'auto', float: 'left', paddingLeft: '5%' }}
                         label='Template'
                         type='muiDropDown'>
                <DropDown style={{}}
                          menuItems={[
                            { label: 'option 1', value: 1 },
                            { label: 'option 2', value: 2 },
                            { label: 'option 3', value: 3 }
                          ]}
                          selectedValue={ this.props.template }
                          onChange={ this.onTemplateChange } />
              </DetailRow>
              <DetailRow rowStyle={{ width: 'auto', float: 'left' }}
                         label='Status'
                         type='muiDropDown'>
                <DropDown menuItems={[
                            { label: 'option 1', value: 1 },
                            { label: 'option 2', value: 2 },
                            { label: 'option 3', value: 3 },
                          ]}
                          selectedValue={ this.props.status }
                          onChange={ this.onStatusChange } />
              </DetailRow>
              <DetailRow rowStyle={{ width: 'auto', float: 'left' }}
                         label='Priority'
                        type='muiDropDown'>
                <DropDown menuItems={[
                            { label: 'option 1', value: 1 },
                            { label: 'option 2', value: 2 },
                            { label: 'option 3', value: 3 },
                          ]}
                          selectedValue={ this.props.priority }
                          onChange={ this.onStatusChange } />
              </DetailRow>
              <DetailRow rowStyle={{ width: 'auto', float: 'left' }}
                         label='Assign'
                         type='muiDropDown'>
                <DropDown menuItems={[
                            { label: 'option 1', value: 1 },
                            { label: 'option 2', value: 2 },
                            { label: 'option 3', value: 3 },
                          ]}
                          selectedValue={ this.props.assign }
                          onChange={ this.onAssignChange } />
              </DetailRow>
            </Details>
            <Details widths={{ lg: [3, 8]}}>
              <DetailRow label='Ticket ID'>
                { ticketId }
              </DetailRow>
              <DetailRow label='Call-In Ticket' type='muiRadio'>
                <RadioButtonGroup value={ this.props.callInTicket }
                                  onChange={ this.onCallInTicketChange }
                                  name='callInTicket'>
                  <RadioButton label='Yes' />
                  <RadioButton label='No' />
                </RadioButtonGroup>
              </DetailRow>
              <DetailRow label='Caller' type='muiTextField'>
                <TextField  value={ this.props.caller }
                            onChange={ e => this.onCallerChange(e.target.value) } />
                <div>
                  <RaisedButton label='Find'
                                onClick={ this.searchCallers }
                                style={{marginRight: '10px'}}
                                secondary />
                  <RaisedButton label='New'
                                onClick={ this.newCaller }
                                style={{marginRight: '10px'}} />
                </div>
              </DetailRow>
              <DetailRow label='People to Notify' type='muiTextField'>
                <TextField value={this.props.people}
                           onChange={ e => this.onPeopleChange(e.target.value) } />
                <div>
                  <RaisedButton label='Find'
                                onClick={ this.findPerson }
                                style={{marginRight: '10px'}}
                                secondary />
                              <RaisedButton label='New'
                                onClick={ this.createPerson }
                                style={{marginRight: '10px'}} />
                  <RaisedButton label='Remove'
                                onClick={ this.deletePerson }
                                style={{marginRight: '10px'}} />
                </div>
              </DetailRow>
            </Details>
            <Details widths={{ lg: [3, 8]}}>
              <DetailRow label='Subject' type='muiTextField'>
                <TextField />
              </DetailRow>
              <DetailRow label='Body' type='muiTextField'>
                <TextField multiline={true}
                           value={this.props.body}
                           onChange={ e => this.onBodyChange(e.target.value) }/>
              </DetailRow>
              <DetailRow label='Send Email Including Customer' type='muiRadio'>
                <RadioButtonGroup value={ this.props.includesCustomer }
                                  onChange={ this.onIncludesCustomerChange }
                                  name='includesCustomer' >
                  <RadioButton label='Yes' />
                  <RadioButton label='No' />
                </RadioButtonGroup>
              </DetailRow>
              <DetailRow label={null} rowStyle={{ marginTop: '2em' }}>
                <RaisedButton label='Create Ticket'
                              onClick={() => this.createTicket()}
                              primary />
              </DetailRow>
            </Details>
          </Layout>
        </Paper>
      </Layout>
    )
  }
}

export default CreateTicket
