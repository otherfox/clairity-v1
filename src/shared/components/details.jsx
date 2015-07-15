import React from 'react'
import Settings from './settings'
import _ from 'lodash'
import {
  Utils,
  Paper,
  ClearFix
} from 'material-ui'

import Layout from './layout'

let ColorManipulator = Utils.ColorManipulator;

let Details = React.createClass ({

  propTypes: {
    data: React.PropTypes.array,
    title: React.PropTypes.string,
    labelTop: React.PropTypes.bool,
    headerStyle: React.PropTypes.object,
    rowStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    valueStyle: React.PropTypes.object,
    cStyle: React.PropTypes.object,
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
        dataObj ?
        <div style={ _.assign(this.style(dataObj.detailType).row, this.props.rowStyle) } key={idx}>
          <Layout widths={this.layout()} cPadding={this.props.cPadding} cStyles={ _.assign(this.style(dataObj.detailType).cStyles, this.props.cStyles) } cStyle={ _.assign(this.style(dataObj.detailType).cStyle, this.props.cStyle) }>
            <div style={_.assign(this.style(dataObj.detailType).label, this.props.label)}>{dataObj.label}</div>
            <div style={_.assign(this.style(dataObj.detailType).value, this.props.value)}>{dataObj.value}</div>
          </Layout>
        </div>
        : false
      );
    }

    let title = (this.props.title || this.props.title === null) ? <div><h3 style={_.assign(this.style().header, this.props.headerStyle)}>{this.props.title}</h3></div> : null ;

    return (
      <div style={this.style().root}>
        <ClearFix>{title}</ClearFix>
        <ClearFix>{fData}</ClearFix>
      </div>
    );
  }
});

Details.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default Details;
