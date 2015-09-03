
import { Component } from 'react'
import async, { collection } from '../shared/components/async'

@async({ locations: collection('location').all() })
class AllLocations extends Component {
  render() {
    return <div />;
  }
}

export default AllLocations;
