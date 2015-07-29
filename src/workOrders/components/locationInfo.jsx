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
    let title = `${location.customer.name} at ${location.name}`;
    let data = [
      {
        label:  'Customer (Billing) Address',
        value:  `${location.customer.street1},
                 ${location.customer.street2},
                 ${location.customer.city},
                 ${location.customer.state},
                 ${location.customer.zip_code}`
      },
      {
        label:  'Location (Service) Address',
        value:  `${location.street1},
                 ${location.street2},
                 ${location.city},
                 ${location.state},
                 ${location.zip_code}`
      },
      {
        label: 'Account #',
        value: `100-${location.customer.id}-${location.id}`
      },
      {
        label: 'Status',
        value: (location.status.description) ?
                  `${location.status.name} - ${location.status.description}`
                :
                  location.status.name
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
