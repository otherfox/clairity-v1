import React, {addons} from 'react/addons'
import DropDown from '../../../shared/components/dropDown'
import delayRender from '../../../shared/components/base'
import {ownersFetched} from '../../actions'
import {queryWorkOrderOwners} from '../../queries'
import {getWorkOrderOwners} from '../../services/users'

let WorkOrderDetailsOwner = React.createClass({
  mixins: [addons.LinkedStateMixin],
  getInitialState() {
    return {
      owner: this.props.workOrder.owner_id || this.props.owners.first().get('id')
    };
  },
  render() {
    return (
      <DropDown menuItems={this.props.owners.unshift(new Map({value:'',label:''}))}
                valueLink={this.linkState('owner')} />
    );
  }
});

export default delayRender(WorkOrderDetailsOwner, {
  writeMethod: ownersFetched,
  shouldFetch: e => e.state.data,
  cacheMethod: queryWorkOrderOwners,
  serviceMethod: getWorkOrderOwners,
  propName: 'owners'
});
