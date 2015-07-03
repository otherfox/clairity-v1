import React from 'react'
import Settings from './settings'
import {ClearFix} from 'material-ui'
import {List} from 'immutable'

let Layout = React.createClass({
  propTypes: {
    cols: React.PropTypes.number,
    widths: React.PropTypes.object,
    breakpoints: React.PropTypes.object,
    order: React.PropTypes.object,
    pPadding: React.PropTypes.string,
    cPadding: React.PropTypes.string,
    cMargin: React.PropTypes.string,
    cStyle: React.PropTypes.object,
    cStyles: React.PropTypes.object,
    type: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getChildWidth(i, breakpoint) {

    let breakpoints = ['lg', 'md', 'sm', 'xs', 'xxs'];

    if (this.props.widths) {
      if(this.props.widths[breakpoint]) {
        if (typeof this.props.widths[breakpoint][i] === 'number') {
          return ((this.props.widths[breakpoint][i] * 100 )/ this.props.cols)+'%';
        } else {
          return this.props.widths[breakpoint][i] || '100%';
        }
      } else {
        let bidx = breakpoints.indexOf(breakpoint);
        if(bidx > -1) {
          for(let j = bidx - 1; j > -1; j--) {
            if(this.props.widths[breakpoints[j]]) {
              return (this.props.widths[breakpoints[j]][i]) ? ((this.props.widths[breakpoints[j]][i] * 100 )/ this.props.cols)+'%' : '100%';
            }
          }
        }
        return '100%'
      }
    }
    return 'initial';
  },

  getChildWidths() {

    let percWidths = [];
    let breakpoint = this.getBreakpoint();

    if (this.props.children) {
      let count = React.Children.count(this.props.children);
      for (let i = 0; i < count; i++) {
        percWidths.push(this.getChildWidth(i, breakpoint));
      }
    } else {
      percWidths = ['100%'];
    }
    return percWidths;
  },

  getChildStyle(i, breakpoint) {

    let breakpoints = ['lg', 'md', 'sm', 'xs', 'xxs'];

    if (this.props.cStyles) {
      if(this.props.cStyles[breakpoint]) {
        let style = this.props.cStyles[breakpoint][i];
        return style;
      } else {
        let bidx = breakpoints.indexOf(breakpoint);
        if(bidx > -1) {
          for(let j = bidx - 1; j > -1; j--) {
            if(this.props.cStyles[breakpoints[j]]) {
              return this.props.cStyles[breakpoints[j]][i] || {};
            }
          }
        }
        return {};
      }
    }
    return {};
  },

  getChildStyles() {

    let breakpoint = this.getBreakpoint();
    let styles = [];

    if (this.props.children) {
      let count = React.Children.count(this.props.children);
      for (let i = 0; i < count; i++) {
        styles.push(this.getChildStyle(i, breakpoint));
      }
    } else {
      styles = [{}];
    }
    return styles;
  },

	getBreakpoint() {
		let vwidth = window.innerWidth,
				bKeys = Object.keys(this.props.breakpoints),
				breakpoint;

		bKeys.forEach( (key, i) => {
			if(this.props.breakpoints[key] > vwidth) {
				let prevKey = i;
				breakpoint = bKeys[prevKey];
			} else if(vwidth > this.props.breakpoints.lg) {
				breakpoint = 'lg';
			}
		});

		return breakpoint;
	},

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillDismount() {
    window.addEventListener('resize', this.handleResize);
  },

  getDefaultProps() {
    return {
      breakpoints: Settings.breakpoints,
      cols: Settings.cols
    }
  },

  getInitialState() {
    return { cWidths: this.getChildWidths(), cStyles: this.getChildStyles() };
  },

	handleResize() {
    if(this.props.widths) {
      this.setState({cWidths: this.getChildWidths() });
    }
    if(this.props.cStyles) {
      this.setState({cStyles: this.getChildStyles() });
    }
  },

  style: function() {

    let style = {};

    if(this.props.type !== 'main') {
      style = {
        width: '100%',
        padding: this.props.pPadding
      }
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
        padding: this.props.cPadding || 'initial',
        margin: this.props.cMargin || 'initial'
    }

    if (this.props.type === 'center-h') {
      style.position = 'relative';
      style.margin = '0 auto';
      style.float = 'none';
    }

    if (this.props.type === 'center-v') {
      style.position = 'relative';
      style.margin = '0 auto';
      style.top = '50%';
      style.transform = 'translateY(-50%)';
      style.float = 'none';
    }

    if(this.props.cStyle) {
      Object.keys(this.props.cStyle).forEach(function(key, i){
        style[key] = this.props.cStyle[key];
      }, this);
    }

    if(this.state.cStyles[i]) {
      Object.keys(this.state.cStyles[i]).forEach(function(key, i){
        style[key] = this.state.cStyles[i][key];
      }, this);
    }

    return style;
  },

  render: function() {

		let children = React.Children.map(this.props.children, (child, i) =>
			 <ClearFix style={this.childStyle(i)}>{React.cloneElement(child)}</ClearFix>
    );

    return (
      <ClearFix style={this.style()}>
        {children}
      </ClearFix>
    );
  }
});

export default Layout;
