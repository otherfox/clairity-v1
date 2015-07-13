import React, {PropTypes} from 'react'
import DropDown from '../shared/components/dropDown'
import {Map} from 'immutable'
import {
  networkCollectionRenderer
} from '../shared/components/networkRenderer'

class ProjectTypesView extends React.Component {
  getMenuItems() {
    return this.props.projectTypes.map(o => new Map({
      label: o.get('name'),
      value: o.get('id')
    })).unshift(new Map({label: "", value: ""}));
  }
  render() {
    return <DropDown {...this.props}
                     menuItems={this.getMenuItems()} />
  }
}
ProjectTypesView.displayName = 'ProjectTypesInternal';

let ProjectTypes = networkCollectionRenderer(ProjectTypesView, {
  tableName: 'projectType',
});

ProjectTypes.displayName = 'ProjectTypes';

export default ProjectTypes;
