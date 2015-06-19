import React from 'react'
import Settings from './settings'

var Footer = React.createClass ({

  propTypes: {
  },

  style: function() {
    return {
      padding: '20px',
      textAlign: 'center',
			position: this.state.position,
    	width: '100%',
    	bottom: '0',
    };
  },

	componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

	handleResize: function() {
      this.setState({position: this.getPosition()});
  },

	getPosition: function() {
		var pos = (window.innerHeight > 850) ? 'fixed': 'relative';
		return pos;
	},

	getInitialState: function() {
		return { position: this.getPosition() };
	},

  render: function() {

    return (
      <div style={this.style()} className="footer">
        Copywrite 2015 One Ring Networks
      </div>
    );
  }
});

export default Footer;
