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
    selectedIndex: React.PropTypes.number
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

  handleChange() {
    this.props.onChange()
  },

  render() {
    let data = false;
    let selectedIndex = false;

    if (this.props.menuItems) {

      debugger;
      data = this.props.menuItems.map((dataObj,idx) => {

        let menuObj;

        if(selectedIndex === dataObj.get('value')) {
          selectedIndex = idx;
        }

        return menuObj = new Map({
          text: dataObj.get('label'),
          value: dataObj.get('value')
        });

      });

      data = data.toJS();
    }


    return (
      <div style={this.style()}>
        <DropDownMenu menuItems={data} selectedIndex={selectedIndex} onChange={this.handleChange} />
      </div>
    );
  }
});

export default DropDown;
