import React, {PropTypes} from 'react'
import Settings from './settings'
import {
  DropDownMenu
} from 'material-ui'

import {Map, List} from 'immutable'

let DropDown = React.createClass({

  propTypes: {
    style: PropTypes.object,
    menuItems: PropTypes.object,
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },

  style() {
    let style = {};

    if (this.props.style) {
      Object.keys(this.props.style)
        .forEach((key, i) => style[key] = this.props.style[key]);
    }

    return style;
  },

  handleChange(ev, index, menuItem) {
    this.props.onChange(menuItem.value, index, ev);
  },

  handleLink(ev, index, menuItem) {
    this.props.valueLink.requestChange(menuItem.value);
  },

  render() {
    let link = this.props.valueLink;
    let searchValue = link ? link.value : this.props.selectedValue;
    let items = (this.props.menuItems || new List()).toJS();
    let data = items.forEach((item, i) => item.key = i);
    let index = data.findIndex(item => item.value === searchValue);

    return (
      <div style={this.style()}>
        <DropDownMenu menuItems={data}
                      selectedIndex={index < 0 ? 0 : +index}
                      onChange={link ? this.handleLink : this.handleChange} />
      </div>
    );
  }
});

export default DropDown;
