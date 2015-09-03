
import { Component } from 'react'
import async, { collection } from '../shared/components/async'


class ListLocationsView extends Component {
  render() {
    return <div />;
  }
}

export const AllLocations = async(ListLocations, { locations: collection('location').all() })

export default ListLocations;
