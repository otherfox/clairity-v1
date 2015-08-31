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
import {
  asyncDropdown,
  asyncTypeahead
} from '../shared/components/collectionDropdown'
import DropDown from '../shared/components/dropDown'
import Header from '../shared/components/header'
import Layout from '../shared/components/layout'
import async, { action, query, collection } from '../shared/components/async'
import controllable from 'react-controllables'
import { v4 } from 'uuid'

let AccountOwnersDropdown = asyncDropdown({ collection: query('accountOwners') });
let TemplatesDropdown = asyncDropdown({ collection: collection('ticketTemplate').all() });
let PrioritiesDropdown = asyncDropdown({ collection: collection('ticketPriority').all() });
let StatusesDropdown = asyncDropdown({ collection: collection('ticketStatus').all() });
let NotifyTypeahead = StatusesDropdown;//asyncTypeahead({ collection: collection('contact').all() });

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
  constructor(props) {
    super(props);
    this.state = {
      ticketId: v4()
    };
  }
  createTicket(props) {
    console.log(this.props);
    // this.props.actions.createTicket(this.props)
  }
  newCaller() {}
  searchCallers() {}
  createPerson() {}
  deletePerson() {}
  render() {
    let ticketId = this.state.ticketId;
    return (
      <Layout widths={{}} cPadding='20px 20px 0 0'>
        <Header>
          <h1>Create Ticket</h1>
        </Header>
        <Paper>
          <Layout widths={{lg: [12, 6, 6], md: [12, 12, 12]}}
                  cPadding='0 0 30px 0'
                  pPadding='0 0 20px 0'>
            <Details pStyles={{ lg: { float: 'left', width: 'auto' },
                                md: { width: '50%'},
                                sm: { width: '100%'}
                              }}
                     cStyles={{ lg: [
                                  { float: 'left', paddingLeft: '20px' },
                                  { float: 'left' }
                                ],
                                 md: [{textAlign: 'right'}, {}],
                                 sm: [{textAlign: 'right'}, {}]
                              }}
                     widths={{ lg: ['auto', 'auto'], md: [3, 8]}}
                     breakpoints={{ md: 1470, sm: 1200 }}>
              <DetailRow label='Template'
                         type='muiDropDown'>
                <TemplatesDropdown selectedValue={ this.props.template }
                                   onChange={ () => this.props.onTemplateChange() } />
              </DetailRow>
              <DetailRow label='Status'
                         type='muiDropDown'>
                <StatusesDropdown selectedValue={ this.props.status }
                                  onChange={ () => this.props.onStatusChange() } />
              </DetailRow>
              <DetailRow label='Priority'
                         type='muiDropDown'>
                <PrioritiesDropdown selectedValue={ this.props.priority }
                                    onChange={ () => this.props.onStatusChange() } />
              </DetailRow>
              <DetailRow label='Assign'
                         type='muiDropDown'>
                <AccountOwnersDropdown />
              </DetailRow>
            </Details>
            <Details widths={{ lg: [3, 8] }} cStyles={{
                sm: [{ textAlign: 'right'}]
            }}>
              <DetailRow label='Ticket ID'>
                { ticketId }
              </DetailRow>
              <DetailRow label='Call-In Ticket' type='muiRadio'>
                <RadioButtonGroup value={ this.props.callInTicket }
                                  onChange={ this.props.onCallInTicketChange }
                                  name='callInTicket'>
                  <RadioButton label='Yes' value='yes' />
                  <RadioButton label='No' value='no' />
                </RadioButtonGroup>
              </DetailRow>
              <DetailRow label='Caller' type='muiTextField'>
                <TextField  value={ this.props.caller }
                            onChange={ e => this.props.onCallerChange(e.target.value) } />
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
                <NotifyTypeahead value={this.props.people}
                                 onChange={ e => this.props.onPeopleChange(e.target.value) } />
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
            <Details widths={{ lg: [3, 8]}} cStyles={{sm:[{textAlign: 'right'}]}}>
              <DetailRow label='Subject' type='muiTextField'>
                <TextField />
              </DetailRow>
              <DetailRow label='Body' type='muiTextField'>
                <TextField multiline={true}
                           value={this.props.body}
                           onChange={ e => this.props.onBodyChange(e.target.value) }/>
              </DetailRow>
              <DetailRow label='Send Email Including Customer' type='muiRadio'>
                <RadioButtonGroup value={ this.props.includesCustomer }
                                  onChange={ this.props.onIncludesCustomerChange }
                                  name='includesCustomer' >
                  <RadioButton label='Yes' value='yes' />
                  <RadioButton label='No' value='no' />
                </RadioButtonGroup>
              </DetailRow>
              <DetailRow label={null} pStyles={{ lg: { marginTop: '2em' } }}>
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
