import React, {PropTypes} from 'react'
import DropDown from '../shared/components/dropDown'
import {Map} from 'immutable'
import {
  networkCollectionRenderer
} from '../shared/components/networkRenderer'

class CampaignSourcesView extends React.Component {
  getMenuItems() {
    return this.props.campaignSources.map(o => new Map({
      label: o.get('name'),
      value: o.get('id')
    })).unshift(new Map({label: "", value: ""}));
  }
  render() {
    return <DropDown {...this.props}
                     menuItems={this.getMenuItems()} />
  }
}
CampaignSourcesView.displayName = 'CampaignSourcesInternal';

let CampaignSources = networkCollectionRenderer(CampaignSourcesView, {
  tableName: 'campaignSource',
});

CampaignSources.displayName = 'CampaignSources';

export default CampaignSources;
