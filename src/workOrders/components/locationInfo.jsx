import React from 'react'
import Settings from '../../shared/components/settings'
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

import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
import {networkModelRenderer} from '../../shared/components/networkRenderer'

import controllable from 'react-controllables'

import {fetchLocation} from '../../shared/actions/location'
import {queryLocation} from '../../shared/queries/location'
import {Navigation} from 'react-router'

//import Location from '../services/stubs/location6384.json'

import {Map, fromJS } from 'immutable'

let LocationInfo = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    id: React.PropTypes.number,
    location: React.PropTypes.object
  },

  render() {

    let location = this.props.location;
    let title = location.getIn(['customer', 'name'])+' at '+location.get('name');
    let data = [
      {
        label:  'Customer (Billing) Address',
        value:  location.getIn(['customer', 'street1'])+', '+
                location.getIn(['customer', 'street2'])+', '+
                location.getIn(['customer', 'city'])+', '+
                location.getIn(['customer', 'state'])+' '+
                location.getIn(['customer', 'zip_code'])
      },
      {
        label:  'Location (Service) Address',
        value:  location.get('street1')+', '+
                location.get('street2')+', '+
                location.get('city')+', '+
                location.get('state')+' '+
                location.get('zip_code')
      },
      {
        label: 'Account #',
        value: '100'+'-'+location.getIn(['customer','id'])+'-'+location.get('id')
      },
      {
        label:  'Status',
        value:  (location.getIn(['status','description'])) ? location.getIn(['status','name'])+' - '+location.getIn(['status','description']) : location.getIn(['status','name'])
      }
    ];

    return (
      <div style={this.props.style}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{lg:[12],md:[12],sm:[12],xs:[12]}} pPadding={'0 20px 20px 20px'}>
            <div>
              <Details title={title} data={data} />
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default networkModelRenderer(LocationInfo, 'location');
