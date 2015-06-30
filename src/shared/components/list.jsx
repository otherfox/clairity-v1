import React from 'react'
import Settings from './settings'
import {
  Utils,
  List,
  ListItem,
  ListDivider,
  ListItem

} from 'material-ui'
import Layout from './layout'
let ColorManipulator = Utils.ColorManipulator;

let CustomList = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    data: React.PropTypes.array,
    title: React.PropTypes.string,
    labelTop: React.PropTypes.bool
  },

  style() {

    let textColor = this.context.muiTheme.palette.textColor;
    let style = {
      color: textColor,
      lineHeight: '180%'
    };

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        console.log(key);
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  labelStyle(type) {

    let textColor = ColorManipulator.fade(this.context.muiTheme.palette.textColor, .6 );


    let labelStyle = {
      color: textColor,
      textAlign: 'right',
    }

    if(this.props.labelTop === true) labelStyle.textAlign = 'left'
    if(type === 'muiTextField' || type === 'muiDatePicker') labelStyle.lineHeight = 3.5;
    if(type === 'muiDropDown') labelStyle.lineHeight = 4;

    return labelStyle;
  },

  headerStyle() {

    let textColor = ColorManipulator.fade(this.context.muiTheme.palette.textColor, .3 );

    return {
      color: textColor,
      height: '1.7em',
      marginBottom: '1em'
    }
  },

  rowStyle(type) {

    let rowStyle = {};

    if (type === 'muiTextField' || type === 'muiDatePicker' || type === 'muiDropDown') {}
    else {}

    return rowStyle;
  },

  valueStyle(type) {
    let valueStyle = {}
    if(type === 'muiButton') valueStyle.marginTop = '20px';
    return valueStyle;
  },

  layout() {
    return (this.props.labelTop) ? {lg: [12,12], md: [12,12], sm: [12,12], xs: [12,12], xxs: [12,12]} : {lg: [5,7], md: [4,8], sm: [12,12], xs: [12,12], xxs: [12,12]};
  },

  render() {
    let fData = false;
    if (this.props.data && Array.isArray(this.props.data)) {
      fData = this.props.data.map((dataObj,idx) =>
        <div style ={this.rowStyle(dataObj.detailType)} key={idx}>
          <Layout widths={this.layout()} cPadding={'0 20px 5px 0'}>
            <div style={this.labelStyle(dataObj.detailType)}>{dataObj.label}</div>
            <div style={this.valueStyle(dataObj.detailType)}>{dataObj.value}</div>
          </Layout>
        </div>);
    }

    let title = (this.props.title || this.props.title === null) ? <div><h3 style={this.headerStyle()}>{this.props.title}</h3></div> : null ;

    return (
      <div style={this.style()}>
      </div>
    );
  }
});

CustomList.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default CustomList;
