import React from 'react'
import Settings from './settings'
import _ from 'lodash'
import {
  DropDownMenu
} from 'material-ui'
import uid from 'uid'

let DropDown = React.createClass({

  propTypes: {
    menuItems: React.PropTypes.object,
    menuItemStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    underlineStyle: React.PropTypes.object,
    selectedValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
  },

  style() {
    return {
      root: {
      },
      underlineStyle: {
        marginLeft: 0
      },
      labelStyle: {
        paddingLeft: 0,
        zIndex: 0,
      },
      menuItemStyle: {
        zIndex: 3,
        maxHeight: '500px',
        overflow: 'auto'
      }
    }
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
    let items = this.props.menuItems || [];
    let data = items.map((item, i) => {return {text: item.label, key: i, value: item.value}});
    let index = data.findIndex(item => item.value === searchValue);
    let overflow =  data.length > 15 ?
                      `max-height: 500px;
                      overflow: auto !important;`
                    :
                      '';
    let menuClass = 'm'+uid();

    return (
      <div style={_.assign(this.style().root, this.props.style)}>
        <style>{`
            .${menuClass} div:nth-child(2){
              ${overflow}
            }
        `}</style>
        <DropDownMenu menuItems={data}
                      selectedIndex={index < 0 ? 0 : +index}
                      onChange={link ? this.handleLink : this.handleChange}
                      labelStyle={_.assign(this.style().labelStyle, this.props.labelStyle)}
                      underlineStyle={_.assign(this.style().underlineStyle, this.props.underlineStyle)}
                      menuItemStyle={_.assign(this.style().menuItemStyle, this.props.menuItemStyle)}
                      className={menuClass}
                      />
      </div>
    );
  }
});

export default DropDown;
