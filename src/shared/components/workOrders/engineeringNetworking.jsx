import React from 'react'
import Settings from '../settings'

let data = [];

let EngineeringNetwroking = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    data: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      data: data
    };
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
    return (
      <div style={this.style()}>
        <h3>Engineering Netwroking</h3>
      </div>
    );
  }
});

export default EngineeringNetwroking;
