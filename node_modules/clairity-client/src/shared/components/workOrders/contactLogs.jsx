import React from 'react'
import Settings from '../settings'
import Layout from '../layout'
import {
  Paper
} from 'material-ui'

let data = [];

let ContactLogs = React.createClass ({

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
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{ lg: [12,12], md: [12,12], sm: [12,12], xs: [12,12], xxs: [12,12]}} cPadding={'0 20px 20px 20px'}>
            <div>
              <h4>Contact Logs</h4>
            </div>
            <Layout widths={{ lg: [3,8], md: [3,8], sm: [12,12], xs: [12,12], xxs: [12,12]}}>
              <div></div>
              <div></div>
            </Layout>
          </Layout>
        </Paper>

      </div>
    );
  }
});

export default ContactLogs;
