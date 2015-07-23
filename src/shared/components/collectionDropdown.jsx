import React, {PropTypes} from 'react'
import DropDown from './dropDown'
import {Map} from 'immutable'
import {
  networkCollectionRenderer,
  queryRenderer,
  collectionViaQuery,
  collectionQuery
} from './networkRenderer'

const blankMap = new Map({label: '', value: ''});

class CollectionDropdownView extends React.Component {
  getMenuItems() {
    let items = this.props.collection
      .filter(this.props.filterBy)
      .map(o => new Map({
        label: this.getItemLabel(o),
        value: this.getItemValue(o)
      }));
    return this.props.includeBlank ?
        items.unshift(blankMap)
      :
        items;
  }
  getItemValue(item) {
    if (this.props.getValue) {
      return this.props.getValue(item);
    }
    return item.get(this.props.valueKey);
  }
  getItemLabel(item) {
    if (this.props.getLabel) {
      return this.props.getLabel(item);
    }
    return item.get(this.props.labelKey);
  }
  render() {
    return <DropDown {...this.props}
                     menuItems={this.getMenuItems()} />
  }
}

CollectionDropdownView.defaultProps = {
  labelKey: 'name',
  valueKey: 'id',
  includeBlank: true,
  filterBy: _ => true
}

export function collectionDropdown(tableName) {
  return queryRenderer(CollectionDropdownView, {
    queries: [
      collectionQuery(tableName, 'collection')
    ]
  });
};

export function collectionViaDropdown(table, keyName, viaTable) {
  return queryRenderer(CollectionDropdownView, {
    queries: [
      collectionViaQuery({
        table, viaTable, keyName,
        idName: `${viaTable}Id`,
        propName: 'collection'
      })
    ]
  });
}
