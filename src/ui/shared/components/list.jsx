import React from 'react'
import Settings from './settings'
import _ from 'lodash'
import {
  Utils,
  Paper,
  ClearFix,
  List,
  ListItem,
  ListDivider,
  Avatar,
  Styles
} from 'material-ui'

import Layout from './layout'

let ColorManipulator = Utils.ColorManipulator;

let CustomList = React.createClass ({

  propTypes: {
    data: React.PropTypes.array,
    title: React.PropTypes.string,
    labelTop: React.PropTypes.bool,
    headerStyle: React.PropTypes.object,
    rowStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    valueStyle: React.PropTypes.object,
    cStyles: React.PropTypes.object,
    cPadding: React.PropTypes.string,
    widths: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      widths: {lg: [5,7], md: [4,8], sm: [12]},
      cPadding: '0 20px 5px 0'
    }
  },

  style(detailType) {

    let textColor = this.context.muiTheme.palette.textColor;
    let labelColor = ColorManipulator.fade(this.context.muiTheme.palette.textColor, .6 );
    let headerColor = ColorManipulator.fade(this.context.muiTheme.palette.textColor, .3 );
    let labelLineHeight = {
      muiDropDown: '4em',
      muiTextField: '3.2em',
    }

    return {
      cStyles: {
        lg: (this.props.labelTop === true) ? [{ textAlign: 'left' }] : [{ textAlign: 'right' }],
        sm: [{ textAlign: 'left'}]
      },
      header: {
        color: textColor,
        margin: '1em 0',
        lineHeight: '1.8em',
        height: (this.props.title === null) ? '1.8em' : 'auto'
      },
      label: {
        color: labelColor,
        lineHeight: (labelLineHeight[detailType]) ? labelLineHeight[detailType] : 'inherit'
      },
      root: {
        color: textColor,
        lineHeight: '180%'
      },
      row: {
        margin: (detailType === 'muiCheckbox') ? '20px 0' : 'initial'
      },
      value: {
        marginTop: (detailType === 'muiButton') ? '20px' : 'initial'
      }
    };
  },

  layout() {
    return (this.props.labelTop === true) ? {} : this.props.widths;
  },

  render() {

    let fData = false;
    if (this.props.data && Array.isArray(this.props.data)) {
      fData = this.props.data.map((dataObj,idx) =>
        <ListItem
            leftAvatar={<Avatar
        color={this.context.muiTheme.palette.accent3Color}
        backgroundColor={this.context.muiTheme.palette.primary1Color}>
        {dataObj.label.charAt(0)}
      </Avatar>}
            primaryText={dataObj.label}
            secondaryText={<div><div style={{color: this.context.muiTheme.palette.accent1Color}}>{dataObj.date}</div><div style={{color: this.context.muiTheme.palette.textColor}}>{dataObj.value}</div></div>}
            secondaryTextLines={2}
        />
        );
    }

    return (
        <List>{fData}</List>
    );
  }
});

CustomList.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default CustomList;
