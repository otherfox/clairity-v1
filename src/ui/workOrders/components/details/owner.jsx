import React, {addons} from 'react/addons'
import DropDown from '../../../shared/components/dropDown'
import queryRenderer from '../../../shared/components/networkRenderer/queryRenderer'
import {ownersFetched} from '../../actions'
import {queryWorkOrderOwners} from '../../queries'
import {getWorkOrderOwners} from '../../../../core/services/users'
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
      .map(o => {
        return {
          label: o.name,
          value: o.id
        }
      })
      .unshift({value: '', label: ''});
    return result;
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

export default queryRenderer(WorkOrderDetailsOwner, {
  queries: [{
    tableName: 'user',
    writeMethod: ownersFetched,
    shouldFetch: e => e.state.data,
    cacheMethod: queryWorkOrderOwners,
    serviceMethod: getWorkOrderOwners,
    propName: 'owners'
  }]
});
