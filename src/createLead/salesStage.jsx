import React, {PropTypes} from 'react'
import DropDown from '../shared/components/dropDown'
import {Map} from 'immutable'
import {
  networkCollectionRenderer
} from '../shared/components/networkRenderer'

class SalesStagesView extends React.Component {
  getMenuItems() {
    return this.props.salesStages.map(o => new Map({
      label: o.get('name'),
      value: o.get('id')
    })).unshift(new Map({label: "", value: ""}));
  }
  render() {
    return <DropDown {...this.props}
                     menuItems={this.getMenuItems()} />
  }
}
SalesStagesView.displayName = 'SalesStagesInternal';

let SalesStages = networkCollectionRenderer(SalesStagesView, {
  tableName: 'salesStage',
});

SalesStages.displayName = 'SalesStages';

export default SalesStages;
