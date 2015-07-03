import React, {addons} from 'react/addons'
import DropDown from '../../../shared/components/dropDown'
import delayRender from '../../../shared/components/networkRenderer/base'
import {ownersFetched} from '../../actions'
import {queryWorkOrderOwners} from '../../queries'
import {getWorkOrderOwners} from '../../services/users'
import {Map, List} from 'immutable'

let WorkOrderDetailsOwner = React.createClass({
  mixins: [addons.LinkedStateMixin],
  getInitialState() {
    return {
      owner: this.props.workOrder.owner_id || ''
    };
  },
  getMenuItems() {
    let result = this.props.owners
      .map(o =>
          new Map({
            label: o.get('name'),
            value: o.get('id')
          })
      )
      .unshift(new Map({value: '', label: ''}));
    return new List(result);
  },
  render() {

    let result = (this.props.owners.size > 0) ? <DropDown menuItems={this.getMenuItems()} valueLink={this.linkState('owner')} /> : '';

    return (
      <div>
        {result}
      </div>
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
