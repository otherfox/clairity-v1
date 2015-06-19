import React from 'react'
import Settings from './settings'

let Content = React.createClass ({

  getWidth: function() {
    let width = (window.innerWidth - Settings.leftNavWidth - Settings.widthBuffer )+'px';
    return width;
  },

  handleResize: function() {
    this.setState({width: this.getWidth()});
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  getInitialState: function() {
    return { width: this.getWidth() };
  },

  style: function() {
    return {
      padding: `${Settings.contentPadding / 2}px ${Settings.contentPadding}px`,
      float: 'left',
      width: this.state.width,
    };
  },

  render: function() {
    return (
      <div style={this.style()} className="content">
        {this.props.children}
      </div>
    );
  }
});

export default Content;
