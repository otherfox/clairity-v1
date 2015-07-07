import React from 'react'
import Settings from './settings'
import {
  Utils,
  Paper,
  ClearFix
} from 'material-ui'

import Layout from './layout'

let ColorManipulator = Utils.ColorManipulator;

let Details = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    data: React.PropTypes.array,
    title: React.PropTypes.string,
    labelTop: React.PropTypes.bool,
    headerStyle: React.PropTypes.object,
    rowStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    valueStyle: React.PropTypes.object,
    cStyles: React.PropTypes.object,
    layout: React.PropTypes.object
  },

  style() {

    let textColor = this.context.muiTheme.palette.textColor;
    let style = {
      color: textColor,
      lineHeight: '180%'
    };

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  labelStyle(type) {

    let textColor = ColorManipulator.fade(this.context.muiTheme.palette.textColor, .6 );


    let labelStyle = {
      color: textColor,
    }

    if(this.props.labelTop === true) labelStyle.textAlign = 'left'
    if(type === 'muiTextField' || type === 'muiDatePicker') labelStyle.lineHeight = 3.5;
    if(type === 'muiDropDown') labelStyle.lineHeight = 4;

    if(this.props.labelStyle) {
      Object.keys(this.props.labelStyle).forEach(function(key, i){
        labelStyle[key] = this.props.labelStyle[key];
      }, this);
    }

    return labelStyle;
  },

  headerStyle() {

    let textColor = ColorManipulator.fade(this.context.muiTheme.palette.textColor, .3 );

    let headerStyle =  {
      color: textColor,
      margin: '1em 0',
      lineHeight: '1.8em'
    };

    headerStyle.height = (this.props.title === null) ? '1.8em' : 'auto';

    if(this.props.headerStyle) {
      Object.keys(this.props.headerStyle).forEach(function(key, i){
        headerStyle[key] = this.props.headerStyle[key];
      }, this);
    }

    return headerStyle;
  },

  rowStyle(type) {

    let rowStyle = {};

    if (type === 'muiTextField' || type === 'muiDatePicker' || type === 'muiDropDown') {}
    else if( type == 'muiCheckbox') { rowStyle.margin = '20px 0'; }
    else {}

    if(this.props.rowStyle) {
      Object.keys(this.props.rowStyle).forEach(function(key, i){
        rowStyle[key] = this.props.rowStyle[key];
      }, this);
    }

    return rowStyle;
  },

  valueStyle(type) {
    let valueStyle = {}
    if(type === 'muiButton') valueStyle.marginTop = '20px';

    if(this.props.valueStyle) {
      Object.keys(this.props.valueStyle).forEach(function(key, i){
        valueStyle[key] = this.props.valueStyle[key];
      }, this);
    }

    return valueStyle;
  },

  layout() {

    let layout = (this.props.layout) ? this.props.layout : {lg: [5,7], md: [4,8], sm: [12]};

    return (this.props.labelTop) ? {} : layout;
  },

  cStyles() {

    let cStyles = {lg: [{ textAlign: 'right' }], sm: [{ textAlign: 'left'}]};

    if(this.props.cStyles) {
      Object.keys(this.props.cStyles).forEach(function(key, i){
        cStyles[key] = this.props.cStyles[key];
      }, this);
    }

    return cStyles;
  },

  render() {
    let fData = false;
    if (this.props.data && Array.isArray(this.props.data)) {
      fData = this.props.data.map((dataObj,idx) =>
        <div style={this.rowStyle(dataObj.detailType)} key={idx}>
          <Layout widths={this.layout()} cPadding={'0 20px 5px 0'} cStyles = {this.cStyles()}>
            <div style={this.labelStyle(dataObj.detailType)}>{dataObj.label}</div>
            <div style={this.valueStyle(dataObj.detailType)}>{dataObj.value}</div>
          </Layout>
        </div>);
    }

    let title = (this.props.title || this.props.title === null) ? <div><h3 style={this.headerStyle()}>{this.props.title}</h3></div> : null ;

    return (
      <div style={this.style()}>
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
