import React from 'react'
import Settings from './settings'
import {
  DropDownMenu
} from 'material-ui'

import {Map} from 'immutable'

let DropDown = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    menuItems: React.PropTypes.object,
    selectedValue: React.PropTypes.number
  },

  style() {
    let style = {};

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        console.log(key);
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  handleChange(ev, index, menuItem) {
    this.props.onChange(menuItem.value, index, ev);
  },

  render() {
    let data = false;
    let selectedValue = this.props.selectedValue;

    if (this.props.menuItems) {

      data = this.props.menuItems.map((dataObj,idx) => {

        let menuObj;

        if(selectedValue === dataObj.get('value')) {
          selectedValue = idx;
        }

        return menuObj = new Map({
          key: idx,
          text: dataObj.get('label'),
          value: dataObj.get('value')
        });

      });

      data = data.toJS();
    }


    return (
      <div style={this.style()}>
        <DropDownMenu menuItems={data} selectedIndex={selectedValue} onChange={this.handleChange} />
      </div>
    );
  }
});

export default DropDown;
