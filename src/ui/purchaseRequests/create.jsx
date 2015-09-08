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
import { contextTypes } from '../shared/decorators'

let CustomerTypeahead = asyncTypeahead({ collection: collection('account').all() });

@controllable([
  'locationId',
  'approvalDate',
  'requestedBy',
  'item',
  'approvalId',
  'customerId',
  'sourceId',
  'vendorId',
  'amount',
  'type',
  'notes',
  'file1',
  'file2',
  'file3'
])

@async({ createPurchaseRequest: action() })
class CreatePurchaseRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestId: v4()
    };
  }
  createPurchaseRequest(props) {
    let submission = {
      id: this.state.requestId,
      received_date: moment().format('YYYY-MM-DD h:mm A'),
      location_id: this.props.locationId,
      source_id: this.props.sourceId,
      vendor_id: this.props.vendorId,
      approval_date: this.props.approvalDate,
      requested_by: this.props.requestedBy,
      item: this.props.item,
      approval_id: this.props.approvalId,
      customer_id: this.props.customerId,
      amount: this.props.amount,
      type: this.props.type,
      notes: this.props.notes,
      file1: this.props.file1,
      file2: this.props.file2,
      file3: this.props.file3,
    }

    console.log(submission);
    // this.props.actions.createTicket(this.props)
  }
  render() {
    return (
      <Layout widths={{}} cPadding='20px 20px 0 0'>
        <Header>
          <h1>Request Purchase</h1>
        </Header>
        <Paper>
          <Layout widths={{}}
                  pPadding='20px 0 20px 0'>
            <Details>
              <DetailRow label='Request Type' type='muiTextField'>
                <CustomerTypeahead value={ this.props.type || '' }
                                   onOptionSelected={ i => this.props.onTypeChange(i) } />
              </DetailRow>
              <DetailRow label='Customer' type='muiTextField'>
                <CustomerTypeahead value={ this.props.customerId || '' }
                                   onOptionSelected={ i => this.props.onCustomerIdChange(i) } />
              </DetailRow>
              <DetailRow label='Location' type='muiTextField'>
                <TextField value={ this.props.locationId || '' }
                           onChange={ e => this.props.onLocationIdChange(e.target.value) } />
              </DetailRow>
              <DetailRow label='Item(s) to Purchase' type='muiTextField'>
                <TextField value={ this.props.item || '' }
                           onChange={ e => this.props.onItemChange(e.target.value) } />
              </DetailRow>
              <DetailRow label='Total Cost $' type='muiTextField'>
                <TextField value={ this.props.amount || '' }
                           onChange={ e => this.props.onAmountChange(e.target.value) } />
              </DetailRow>
              <DetailRow label='Payment Source' type='muiTextField'>
                <TextField value={ this.props.sourceId || '' }
                           onChange={ e => this.props.onSourceIdChange(e.target.value) } />
              </DetailRow>
              <DetailRow label='Suggested Vendor' type='muiTextField'>
                <TextField value={ this.props.vendorId || '' }
                           onChange={ e => this.props.onVendorIdChange(e.target.value) } />
              </DetailRow>
              <DetailRow label='Need for Purchase' type='muiTextField'>
                <TextField value={ this.props.note || '' }
                           hint='Describe why it is necessary to purchase the item(s)'
                           onChange={ e => this.props.onNoteChange(e.target.value) } />
              </DetailRow>
              <DetailRow label='Attach Files' type='muiButton'>
                <RaisedButton label='Choose File' style={{ marginRight: '10px' }} />
                <RaisedButton label='Choose File' style={{ marginRight: '10px' }} />
                <RaisedButton label='Choose File' style={{ marginRight: '10px' }} />
              </DetailRow>
              <DetailRow valueStyle={{ paddingTop: '10px'}}>
                <RaisedButton label='Send Request'
                               primary
                               onClick={() => this.createPurchaseRequest() } />
              </DetailRow>
            </Details>
          </Layout>
        </Paper>
      </Layout>
    )
  }
}

export default CreatePurchaseRequest
