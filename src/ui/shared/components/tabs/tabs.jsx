import React from 'react'
import { Tabs, Tab } from 'material-ui'
import Layout from '../layout'

let CustomTabs = React.createClass ({

  propTypes: {
    compact: React.PropTypes.bool
  },

  style() {

    let style = { };

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  render: function() {

    let tabData = React.Children.map(this.props.children, (child, i) =>  <Tab label={child.props.label}>{child}</Tab>);

    let view = (this.props.compact) ? <Layout widths={{lg: [12]}} cPadding={'20px 20px 0 0'}><Tabs>{tabData}</Tabs></Layout> : this.props.children;

    return (
      <div>
        {view}
      </div>
    );
  }

});

export default CustomTabs;
