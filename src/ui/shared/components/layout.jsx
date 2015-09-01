import React from 'react'
import Settings from './settings'
import _ from 'lodash'
import { v4 } from 'uuid'
import { ClearFix } from 'material-ui'
import { List } from 'immutable'

function withoutFns(obj) {
  return _.omit(obj, _.functions(obj));
}

let Layout = React.createClass({
  propTypes: {
    cols: React.PropTypes.number,
    widths: React.PropTypes.shape({
      lg: React.PropTypes.arrayOf(React.PropTypes.number),
      md: React.PropTypes.arrayOf(React.PropTypes.number),
      sm: React.PropTypes.arrayOf(React.PropTypes.number),
      xs: React.PropTypes.arrayOf(React.PropTypes.number),
      xxs: React.PropTypes.arrayOf(React.PropTypes.number)
    }),
    breakpoints: React.PropTypes.shape({
      lg: React.PropTypes.number,
      md: React.PropTypes.number,
      sm: React.PropTypes.number,
      xs: React.PropTypes.number,
      xxs: React.PropTypes.number
    }),
    order: React.PropTypes.object,
    pPadding: React.PropTypes.string,
    cPadding: React.PropTypes.string,
    cMargin: React.PropTypes.string,
    cStyle: React.PropTypes.object,
    cStyles: React.PropTypes.shape({
      lg: React.PropTypes.arrayOf(React.PropTypes.object),
      md: React.PropTypes.arrayOf(React.PropTypes.object),
      sm: React.PropTypes.arrayOf(React.PropTypes.object),
      xs: React.PropTypes.arrayOf(React.PropTypes.object),
      xxs: React.PropTypes.arrayOf(React.PropTypes.object)
    }),
    type: React.PropTypes.string,
    style: React.PropTypes.object,
    pStyles: React.PropTypes.shape({
      lg: React.PropTypes.object,
      md: React.PropTypes.object,
      sm: React.PropTypes.object,
      xs: React.PropTypes.object,
      xxs: React.PropTypes.object
    }),
  },

  shouldComponentUpdate(props) {
    if (!_.eq(withoutFns(props), withoutFns(this.props))) {
      return true;
    }
    return false;
  },

  componentWillReceiveProps(props) {
    if (!_.eq(withoutFns(props), withoutFns(this.props))) {
      this.setState({
        styles: this.calcStyleString(props, this.state.rand)
      });
    }
  },

  getDefaultProps() {
    return {
      breakpoints: {
        lg: Settings.breakpoints.lg,
        md: Settings.breakpoints.md,
        sm: Settings.breakpoints.sm,
        xs: Settings.breakpoints.xs,
        xxs: Settings.breakpoints.xxs,
      },
      cols: Settings.cols,
      pStyles: {
        lg: {},
        md: {},
        sm: {},
        xs: {},
        xxs: {}
      }
    }
  },

  getChildWidth(i, breakpoint, props) {

    let breakpoints = Object.keys(Settings.breakpoints);

    if (props.widths) {
      if(props.widths[breakpoint]) {
        if (typeof props.widths[breakpoint][i] === 'number') {
          return ((props.widths[breakpoint][i] * 100 )/ props.cols)+'%';
        } else {
          return props.widths[breakpoint][i] || '100%';
        }
      } else {
        let bidx = breakpoints.indexOf(breakpoint);
        if(bidx > -1) {
          for(let j = bidx - 1; j > -1; j--) {
            if(props.widths[breakpoints[j]]) {
              return (props.widths[breakpoints[j]][i]) ? ((props.widths[breakpoints[j]][i] * 100 )/ props.cols)+'%' : '100%';
            }
          }
        }
        return '100%'
      }
    }
    return 'initial';
  },

  getChildStyle(i, breakpoint, props) {

    let breakpoints = Object.keys(Settings.breakpoints);

    if (props.cStyles) {
      if(props.cStyles[breakpoint]) {
        return props.cStyles[breakpoint][i];
      } else {
        let bidx = breakpoints.indexOf(breakpoint);
        if(bidx > -1) {
          for(let j = bidx - 1; j > -1; j--) {
            if(props.cStyles[breakpoints[j]]) {
              return props.cStyles[breakpoints[j]][i] || {};
            }
          }
        }
        return {};
      }
    }
    return {};
  },

  getChildStyleCSS(i, breakpoint, props) {
    return this.getStyleCSS(this.getChildStyle(i, breakpoint, props));
  },

  getStyleCSS(cStyle) {
    let cStyleCSS='';
    if (typeof cStyle === 'object' && cStyle !== {}) {
      let cStyleKeys = Object.keys(cStyle);
      for (let i = 0; i < cStyleKeys.length; ++i) { // for loop for SPEED
        let k = cStyleKeys[i];
        cStyleCSS += k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ':' +
                     cStyle[k]+';';
      }
    }
    return cStyleCSS;
  },

  style(props) {
    let style = {
      root: {
        width : (props.type === 'main') ? 'initial' : '100%',
        padding: (props.type === 'main') ? 'initial' : props.pPadding,
        height: (props.type === 'center-v') ? '100%' : 'initial'
      },
      child: {
        float: 'left',
        padding: props.cPadding || 'initial',
        margin: props.cMargin || 'initial'
      }
    }

    if (props.type === 'center-h') {
      style.child = _.assign(style.child, {
        position: 'relative',
        margin: '0 auto',
        float: 'none'
      });
    }

    if (props.type === 'center-v') {
      style.child = _.assign( style.child, {
        position: 'relative',
        margin: '0 auto',
        top: '50%',
        transform: 'translateY(-50%)',
        float: 'none'
      });
    }
    return style;
  },

  getInitialState() {
    let rand = v4();
    return {
      rand,
      styles: this.calcStyleString(this.props, rand)
    };
  },

  calcStyleString(props, r) {
    let pclass = 'p' + r;
    let styles = [];
    React.Children.map(props.children, (child, i) => {
      let cclass = 'c' + r + i;
      styles.push(`
        /* general style */
        .${pclass} .${cclass} {
          ${this.getStyleCSS(_.assign(this.style(props).child, props.cStyle))}
        }

        /* lg */
        .${pclass} .${cclass} {
          width: ${this.getChildWidth(i, 'lg', props)};
          ${this.getChildStyleCSS(i, 'lg', props)}
        }
        .${pclass} {
          ${this.getStyleCSS(_.assign(this.style(props).root, props.pStyles['lg'], props.style))}
        }

        /* md */
        @media (max-width: ${props.breakpoints.md}px) {
          .${pclass} .${cclass} {
              width: ${this.getChildWidth(i, 'md', props)};
              ${this.getChildStyleCSS(i, 'md', props)}
          }
          .${pclass} {
            ${this.getStyleCSS(props.pStyles['md'])}
          }
        }
        /* sm */
        @media (max-width: ${props.breakpoints.sm}px) {
          .${pclass} .${cclass} {
              width: ${this.getChildWidth(i, 'sm', props)};
              ${this.getChildStyleCSS(i, 'sm', props)}
          }
          .${pclass} {
            ${this.getStyleCSS(props.pStyles['sm'])}
          }
        }
        /* xs */
        @media (max-width: ${props.breakpoints.xs}px) {
          .${pclass} .${cclass} {
              width: ${this.getChildWidth(i, 'xs', props)};
              ${this.getChildStyleCSS(i, 'xs', props)}
              ${this.getStyleCSS(props.pStyles['xs'])}
          }
          .${pclass} {
            ${this.getStyleCSS(props.pStyles['xs'])}
          }
        }
        /* xxs */
        @media (max-width: ${props.breakpoints.xxs}px) {
          .${pclass} .${cclass} {
              width: ${this.getChildWidth(i, 'xxs', props)};
              ${this.getChildStyleCSS(i, 'xxs', props)}
              ${this.getStyleCSS(props.pStyles['xxs'])}
          }
          .${pclass} {
            ${this.getStyleCSS(props.pStyles['xxs'])}
          }
        }
      `);
    });
    return styles;
  },

  render: function() {
    console.log('layout', 'rendered')
    let pclass = 'p' + this.state.rand;
		let children = React.Children.map(this.props.children, (child, i) => {
      let cclass = 'c' + this.state.rand + i;
      return (
        <ClearFix className={cclass} style={child.props.style}>
          <style>{this.state.styles[i]}</style>
          {child}
        </ClearFix>
      );
    });

    return (
        <ClearFix className={pclass}>
          {children}
        </ClearFix>
    );
  }
});

export default Layout;
