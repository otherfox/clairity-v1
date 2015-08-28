import React from 'react'

let CustomTab = React.createClass ({

  propTypes: {
    label: React.PropTypes.string
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

  render: function() {

    return (
      <div>
        {this.props.children}
      </div>
    );
  }

});

export default CustomTab;
