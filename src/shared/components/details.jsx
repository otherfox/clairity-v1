import React from 'react'
import Settings from './settings'
import {
  Paper
} from 'material-ui'
import Layout from './layout'

let Details = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    data: React.PropTypes.array,
    title: React.PropTypes.string,
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

  labelStyle(type) {
    let labelStyle = {
      textAlign: 'right',
    }
    if(type === 'muiTextField' || type === 'muiDatePicker') labelStyle.lineHeight = 3.5;
    if(type === 'muiDropDown') labelStyle.lineHeight = 4.5;

    return labelStyle;
  },

  valueStyle(type) {
    let valueStyle = {}
    if(type === 'muiButton') valueStyle.marginTop = '20px';
    return valueStyle;
  },

  render() {
    let fData = false;
    if (this.props.data && Array.isArray(this.props.data)) {
      fData = this.props.data.map((dataObj,idx) =>
        <div key={idx}>
          <Layout widths={{ lg: [5,7], md: [4,8], sm: [12,12], xs: [12,12], xxs: [12,12]}} cPadding={'0 20px 5px 0'}>
            <div style={this.labelStyle(dataObj.detailType)}><strong>{dataObj.label}</strong></div>
            <div style={this.valueStyle(dataObj.detailType)}>{dataObj.value}</div>
          </Layout>
        </div>);
    }

    let title = (this.props.title) ? <div><h3>{this.props.title}</h3></div> : null ;

    return (
      <div style={this.style()}>
        {title}
        {fData}
      </div>
    );
  }
});

export default Details;
