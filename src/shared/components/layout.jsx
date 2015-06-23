import React from 'react'
import Settings from './settings'


var Layout = React.createClass ({
  propTypes: {

    // colNum, ex 12
    cols: React.PropTypes.number,

    // {name: [colWidth, colWidth, colWidth], name: [colWidth, colWidth, colWidth]}, ex {lg: [7, 3, 2], md: [4, 4, 4], xs: [12, 12, 12]}
    widths: React.PropTypes.object,

    // {name: pxValue, name: pxValue}, ex {lg: 1200, md: 990, sm: 750, xs: 480, xxs: 380}
    breakpoints: React.PropTypes.object,

    // {name: [colN, colN, colN], name: [colN, colN, colN]}, ex {md: [2, 1, 3], sm: [1, 2, 3]}
    order: React.PropTypes.object,

    // '10px'
    pPadding: React.PropTypes.string,

    // '10px'
    cPadding: React.PropTypes.string,

    // '10px'
    cMargin: React.PropTypes.string,

    // 'row'
    type: React.PropTypes.string,

    style: React.PropTypes.object

  },

  getChildWidth: function(i, breakpoint) {

    if (this.props.widths && this.props.widths[breakpoint][i]) {
      if (typeof this.props.widths[breakpoint][i] === 'number') {
        var width = ((this.props.widths[breakpoint][i] * 100 )/ this.props.cols)+'%';
      } else if (this.props.widths[breakpoint][i]) {
        var width = this.props.widths[breakpoint][i];
      }
    } else {
      var width = 'auto';
    }

    return width;
  },

  getChildWidths: function() {

    var percWidths = [];
    var breakpoint = this.getBreakpoint();

    if(this.props.children) {
      var count = (typeof this.props.children.length === 'undefined') ? 1 : this.props.children.length ;

      for(var i=0;i<count;i++) {
  		 		var width = this.getChildWidth(i, breakpoint);
          percWidths.push(width);
      }

      if (percWidths.indexOf("rest") > -1) {
        percWidths.forEach(function(w, i){
        },this);
      }
    } else {
      percWidths = ['100%'];
    }
    return percWidths;
  },

	getBreakpoint: function() {
		var vwidth = window.innerWidth,
				bKeys = Object.keys(this.props.breakpoints),
				breakpoint;

		bKeys.forEach( function(key, i) {
			if(this.props.breakpoints[key] > vwidth) {
				var prevKey = i;
				breakpoint = bKeys[prevKey];
			} else if(vwidth > this.props.breakpoints.lg) {
				breakpoint = 'lg';
			}
		}, this);

		return breakpoint;
	},

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  getDefaultProps: function() {
    return {
      breakpoints: Settings.breakpoints,
      cols: Settings.cols
    }
  },

  getInitialState: function() {
      return { cWidths: this.getChildWidths() };
  },

	handleResize: function() {

    if(this.props.widths) {
      this.setState({cWidths: this.getChildWidths() });
    }
  },

  class: function() {
    if(!this.props.type) return 'layout';
    return 'layout ' + this.props.type;
  },

  style: function() {

    let style = {
      width: '100%',
      padding: this.props.pPadding
    }

    if(this.props.type === 'center-b'){
      style.height = '100%';
    }

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  childStyle: function(i) {

    let style = {
      width: this.state.cWidths[i],
      float: 'left',
      padding: this.props.cPadding,
      margin: this.props.cMargin
    }

    if(this.props.type === 'center-h') {
      style.position = 'relative';
      style.margin = '0 auto';
      style.float = 'none';
    }

    if(this.props.type === 'center-b') {
      style.position = 'relative';
      style.margin = '0 auto';
      style.top = '50%';
      style.transform = 'translateY(-50%)';
      style.float = 'none';
    }

    return style;
  },

  render: function() {

		var children = React.Children.map(this.props.children, (child, i) =>
				<div style={this.childStyle(i)}>{React.cloneElement(child)}</div>
    );

    return (
      <div style={this.style()} className={this.class()}>
        {children}
      </div>
    );
  }
});

export default Layout;
