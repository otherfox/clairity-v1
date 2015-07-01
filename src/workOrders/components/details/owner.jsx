import React, {addons} from 'react/addons'
import DropDown from '../../../shared/components/dropDown'
import delayRender from '../../../shared/components/networkRenderer/base'
import {ownersFetched} from '../../actions'
import {queryWorkOrderOwners} from '../../queries'
import {getWorkOrderOwners} from '../../services/users'
import {Map} from 'immutable'

let WorkOrderDetailsOwner = React.createClass({
  mixins: [addons.LinkedStateMixin],
  getInitialState() {
    return {
      owner: this.props.workOrder.owner_id || ''
    };
  },
  getMenuItems() {
    let result = this.props.owners
      .map(o => new Map({
        label: o.get('name'),
        value: o.get('id')
      }))
      .unshift(new Map({value: '', label: ''}));
    debugger;
    return result;
  },
  render() {
    debugger;
    return (
      <DropDown menuItems={this.getMenuItems()}
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
