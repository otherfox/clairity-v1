import React, {PropTypes} from 'react'
import DropDown from '../shared/components/dropDown'
import {Map} from 'immutable'
import {
  networkCollectionRenderer
} from '../shared/components/networkRenderer'

class LeadSourcesView extends React.Component {
  getMenuItems() {
    return this.props.leadSources.map(o => new Map({
      label: o.get('name'),
      value: o.get('id')
    })).unshift(new Map({label: "", value: ""}));
  }
  render() {
    return <DropDown {...this.props}
                     menuItems={this.getMenuItems()} />
  }
}
LeadSourcesView.displayName = 'LeadSourcesInternal';

let LeadSources = networkCollectionRenderer(LeadSourcesView, {
  tableName: 'leadSource',
});

LeadSources.displayName = 'LeadSources';

export default LeadSources;
