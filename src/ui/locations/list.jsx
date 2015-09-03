
import React, { Component, PropTypes } from 'react'
import async, { collection } from '../shared/components/async'
import { propTypes } from '../shared/decorators'

import LocationDetails from './public/details'

@propTypes({ locations: PropTypes.arrayOf(PropTypes.object) })
class ListLocations extends Component {
  render() {
    return (
      <div>
        {
          this.props.locations.map(l =>
            <LocationDetails key={l.id} location={l} />
          )
        }
      </div>
    );
  }
}

export const AllLocations = async(ListLocations, {
  locations: collection('location').all()
});

export const AccountLocations = async(ListLocations, {
  locations: collection('location').by('account')
});

export default ListLocations;
