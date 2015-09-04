import React, { Component, PropTypes } from 'react'
import { Paper } from 'material-ui'

import { propTypes } from '../../shared/decorators'
import { Layout, DetailsObject, Settings } from '../../shared/components'
import async, { model } from '../../shared/components/async'

@propTypes({
  location: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    street1: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip_core: PropTypes.number,
    customer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      street1: PropTypes.string,
      street2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip_core: PropTypes.number,
    }).isRequired
  }).isRequired
})
class LocationDetails extends Component {
  render() {
    let location = this.props.location;
    let title = `${location.customer.name} at ${location.name}`;
    let { street1, street2, city, state, zip_code } = location.customer;
    let data = {
      'Customer (Billing) Address': `${street1}, ${street2}, ${city}, ${state}, ${zip_code}`,
      'Location (Service) Address': `${location.street1}, ${location.street2}, ${location.city}, ${location.state}, ${location.zip_code}`,
      'Account #': `100-${location.customer.id}-${location.id}`,
      'Status': (location.status.description) ?
                `${location.status.name} - ${location.status.description}`
              :
                location.status.name
    };

    return (
      <div style={this.props.style}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{}} pPadding={'0 20px 20px 20px'}>
            <DetailsObject title={title} target={data} />
          </Layout>
        </Paper>
      </div>
    );
  }
}

export default LocationDetails;

export const LocationDetailsAsync = async(LocationDetails, { location: model() });
