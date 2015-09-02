import React, {PropTypes, Component} from 'react'
import DropDown from './dropDown'
import { Typeahead, Tokenizer } from './typeahead'
import {
  networkCollectionRenderer,
  queryRenderer,
  collectionViaQuery,
  collectionQuery
} from './networkRenderer'
import async, { collection } from './async'

const blankMap = {label: '', value: ''};

class CollectionDropdownView extends Component {
  getMenuItems() {
    let items = this.props.collection
      .filter(this.props.filterBy)
      .map(o => {
        return {
          label: this.getItemLabel(o),
          value: this.getItemValue(o)
        }
      });
    if (this.props.includeBlank) items.unshift(blankMap);
    return items;
  }
  getItemValue(item) {
    if (this.props.getValue) {
      return this.props.getValue(item);
    }
    return item[this.props.valueKey];
  }
  getItemLabel(item) {
    if (this.props.getLabel) {
      return this.props.getLabel(item);
    }
    return item[this.props.labelKey];
  }
  render() {
    return <DropDown {...this.props}
                     menuItems={this.getMenuItems()} />
  }
}

class CollectionTypeaheadView extends Component {
  getMenuItems() {
    let items = this.props.collection
      .filter(this.props.filterBy)
      .map(o => {
        return {
          label: this.getItemLabel(o),
          value: this.getItemValue(o)
        }
      });
    if (this.props.includeBlank) items.unshift(blankMap);
    return items;
  }
  getItemValue(item) {
    if (this.props.getValue) {
      return this.props.getValue(item);
    }
    return item[this.props.valueKey];
  }
  getItemLabel(item) {
    if (this.props.getLabel) {
      return this.props.getLabel(item);
    }
    return item[this.props.labelKey];
  }
  render() {
    return <Typeahead {...this.props}
                     menuItems={this.getMenuItems()} />
  }
}

class CollectionTokenizerView extends Component {
  getMenuItems() {
    let items = this.props.collection
      .filter(this.props.filterBy)
      .map(o => {
        return {
          label: this.getItemLabel(o),
          value: this.getItemValue(o)
        }
      });
    if (this.props.includeBlank) items.unshift(blankMap);
    return items;
  }
  getItemValue(item) {
    if (this.props.getValue) {
      return this.props.getValue(item);
    }
    return item[this.props.valueKey];
  }
  getItemLabel(item) {
    if (this.props.getLabel) {
      return this.props.getLabel(item);
    }
    return item[this.props.labelKey];
  }
  render() {
    return <Tokenizer {...this.props}
                     menuItems={this.getMenuItems()} />
  }
}

CollectionDropdownView.defaultProps = {
  labelKey: 'name',
  valueKey: 'id',
  includeBlank: true,
  filterBy: _ => true
}
CollectionTypeaheadView.defaultProps = CollectionDropdownView.defaultProps;
CollectionTokenizerView.defaultProps = CollectionDropdownView.defaultProps;

export function collectionDropdown(tableName) {
  return async(CollectionDropdownView, {
    collection: collection(tableName).all()
  });
};

export function asyncDropdown(query) {
  return async(CollectionDropdownView, query);
}

export function asyncTypeahead(query) {
  return async(CollectionTypeaheadView, query);
}

export function asyncTokenizer(query) {
  return async(CollectionTokenizerView, query);
}


export function collectionViaDropdown(table, keyName, viaTable) {
  return async(CollectionDropdownView, {
    collection: collection(table).by(viaTable)
  });
}
