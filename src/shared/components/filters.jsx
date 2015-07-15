import React from 'react'
import Settings from './settings'
import mui from 'material-ui'

var Filters = React.createClass ({

  propTypes: {
    data: React.PropTypes.array
  },

  getWidth: function() {
    var width = window.innerWidth - Settings.leftNavWidth - (2 * Settings.contentPadding) - Settings.widthBuffer;
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

	handleClick: function() {
	},

  style: function() {
    return {
      width: this.state.width + "px",
      margin: "20px 0",
			overflow: "hidden",
			padding: "9px 10px 7px"
    };
  },

	childStyle: function() {
		return {
			float: 'left'
		}
	},

  render: function() {

		var filters = React.Children.map(this.props.children, function(child, i) {

    if(child.props.children) return <div style={this.childStyle()} className={"inline"}>{React.cloneElement(child)}</div>;;
				return <div style={this.childStyle()}>{React.cloneElement(child)}</div>;
		}, this);

    return (
      <div style={this.style()}>
				<div>{filters}</div>
      </div>
    );
  }
});

export default Filters;
