import React, { Component, PropTypes } from 'react'
import {
  TextField,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  Paper,
  Dialog
} from 'material-ui'
import Details from '../shared/components/details'
import DetailRow from '../shared/components/details/detailRow'
import {
  asyncDropdown,
  asyncTypeahead,
  asyncTokenizer
} from '../shared/components/collectionDropdown'
import DropDown from '../shared/components/dropDown'
import Header from '../shared/components/header'
import Layout from '../shared/components/layout'
import async, { action, query, collection } from '../shared/components/async'
import controllable from 'react-controllables'
import { v4 } from 'uuid'
import moment from 'moment'

let AccountOwnersDropdown = asyncDropdown({ collection: query('accountOwners') });
let TemplatesDropdown = asyncDropdown({ collection: collection('ticketTemplate').all() });
let PrioritiesDropdown = asyncDropdown({ collection: collection('ticketPriority').all() });
let StatusesDropdown = asyncDropdown({ collection: collection('ticketStatus').all() });
let CallerTypeahead = asyncTypeahead({ collection: collection('contact').all() });
let NotifyTokenizer = asyncTokenizer({ collection: collection('contact').all() });

@controllable([
  'template',
  'status',
  'priority',
  'assign',
  'callInTicket',
  'callerName',
  'callerLastName',
  'callerPhone',
  'callerCompany',
  'callerCell',
  'subject',
  'body',
  'people',
  'ownerId',
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
    // other vars
    let received_date_time = moment().format('YYYY-MM-DD h:mm A');
    let received_date_time_key = moment().format('YYYYMMDDHmm');
    let last_mod_date_time = received_date_time;
    let last_mod_date_time_key = received_date_time_key;

    let submission = {
      thisTicketId: this.state.ticketId,
      received_date_time_key: received_date_time_key,
      received_date_time: received_date_time,
      last_mod_date_time_key: last_mod_date_time_key,
      last_mod_date_time: last_mod_date_time,

      template_id: this.props.template,
      status_id: this.props.status,
      priority_id: this.props.priority,
      user_id: this.props.ownerId,

      call_in: this.props.callInTicket,

      callerName: this.props.callerName,
      callerLastName: this.props.callerLastName,
      callerPhone: this.props.callerPhone,
      callerEmail: this.props.callerEmail,
      callerCell: this.props.callerCell,
      callerCompany: this.props.callerCell,

      body: this.props.body,
      subject: this.props.subject,

      contact_ids: this.props.people,
    }

    console.log(submission);
    // this.props.actions.createTicket(this.props)
  }
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
                                   onChange={ i => this.props.onTemplateChange(i) } />
              </DetailRow>
              <DetailRow label='Status'
                         type='muiDropDown'>
                <StatusesDropdown selectedValue={ this.props.status }
                                  onChange={ i => this.props.onStatusChange(i) } />
              </DetailRow>
              <DetailRow label='Priority'
                         type='muiDropDown'>
                <PrioritiesDropdown selectedValue={ this.props.priority }
                                    onChange={ i => this.props.onPriorityChange(i) } />
              </DetailRow>
              <DetailRow label='Assign'
                         type='muiDropDown'>
                <AccountOwnersDropdown selectedValue={ this.props.ownerId }
                                       onChange={ i => this.props.onOwnerIdChange(i) } />
              </DetailRow>
            </Details>
            <Details widths={{ lg: [3, 8] }} cStyles={{
                sm: [{ textAlign: 'right'}]
            }}>
              <DetailRow label='Ticket ID'>
                { ticketId }
              </DetailRow>
              <DetailRow label='Call-In Ticket' type='muiRadio'>
                <RadioButtonGroup value={ this.props.callInTicket || true }
                                  onChange={ (e,i) => this.props.onCallInTicketChange(i) }
                                  name='callInTicket'>
                  <RadioButton label='Yes' value={true} />
                  <RadioButton label='No' value={false} />
                </RadioButtonGroup>
              </DetailRow>
              <DetailRow label='Caller' type='muiTextField'>
                <CallerTypeahead value={ this.props.caller || '' }
                                 onOptionSelected={ i => this.props.onCallerChange(i) } />
                <div>
                  <RaisedButton label={'New Caller'} onTouchTap={ () => this.refs.dialog.show() } />
                  <Dialog
                    ref='dialog'
                    title='New Caller'
                    actions={[
                      { text: 'Cancel' },
                      { text: 'Submit', onTouchTap: e => console.log(e), ref: 'submit' }
                    ]}
                    actionFocus="submit"
                    modal={false} >
                      <Details>
                        <DetailRow label='First Name' type='muiTextField'>
                          <TextField  value={ this.props.callerName }
                                      onChange={ e => this.props.onCallerNameChange(e.target.value) } />
                        </DetailRow>
                        <DetailRow label='Last Name' type='muiTextField'>
                          <TextField  value={ this.props.callerLastName }
                                      onChange={ e => this.props.onCallerLastNameChange(e.target.value) } />
                        </DetailRow>
                        <DetailRow label='Email' type='muiTextField'>
                          <TextField  value={ this.props.callerEmail }
                                      onChange={ e => this.props.onCallerEmailChange(e.target.value) } />
                        </DetailRow>
                        <DetailRow label='Company' type='muiTextField'>
                          <TextField  value={ this.props.callerCompany }
                                      onChange={ e => this.props.onCallerCompanyChange(e.target.value) } />
                        </DetailRow>
                        <DetailRow label='Phone' type='muiTextField'>
                          <TextField  value={ this.props.callerPhone }
                                      onChange={ e => this.props.onCallerPhoneChange(e.target.value) } />
                        </DetailRow>
                        <DetailRow label='Cell' type='muiTextField'>
                          <TextField  value={ this.props.callerCell }
                                      onChange={ e => this.props.onCallerCellChange(e.target.value) } />
                        </DetailRow>
                      </Details>
                    </Dialog>
                </div>
              </DetailRow>
              <DetailRow label='People to Notify' type='muiTextField'>
                <NotifyTokenizer value={ this.props.people || '' }
                                 onTokenAdd={ (i,s) => this.props.onPeopleChange(s) } />
                <div>
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
                <TextField value={ this.props.subject }
                           onChange={ e => this.props.onSubjectChange(e.target.value) }/>
              </DetailRow>
              <DetailRow label='Body' type='muiTextField'>
                <TextField multiline={true}
                           value={this.props.body}
                           onChange={ e => this.props.onBodyChange(e.target.value) }/>
              </DetailRow>
              <DetailRow label='Send Email Including Customer' type='muiRadio'>
                <RadioButtonGroup value={ this.props.includesCustomer }
                                  onChange={ (e,i) => this.props.onIncludesCustomerChange(i) }
                                  name='includesCustomer' >
                  <RadioButton label='Yes' value={true} />
                  <RadioButton label='No' value={false} />
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
