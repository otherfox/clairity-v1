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
    title: React.PropTypes.string
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

  render() {
    let fData = false;
    if (this.props.data && Array.isArray(this.props.data)) {
      fData = this.props.data.map((dataObj,idx) =>
        <div key={idx}>
          <Layout widths={{ lg: [5,7], md: [4,8], sm: [12,12], xs: [12,12], xxs: [12,12]}} cPadding={'0 20px 10px 0'}>
            <div style={{textAlign: 'right'}}><strong>{dataObj.label}</strong></div>
            <div>{dataObj.value}</div>
          </Layout>
        </div>);
    }

    return (
      <div style={this.style()}>
        <div>
          <h4>{this.props.title}</h4>
        </div>
        {fData}
      </div>
    );
  }
});

export default Details;
