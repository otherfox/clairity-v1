import React, {Component} from 'react'
import Filter from './filter'
import Layout from '../layout'
import { Paper } from 'material-ui'
import _ from 'lodash'
import { throttle } from 'throttle-debounce'

class Filters extends Component {
  style() {
    return {
      lg: {
        maxWidth: '380px',
        width: 'auto'
      },
      md: {
        maxWidth: '100%',
        color: 'red'
      }
    }
  }

  filterData(rawData) {
    let numFilters = React.Children.count(this.props.children);
    let filterComponents = [];
    for (let ref in this.refs) {
      if (ref.includes('filter'))
        filterComponents.push(this.refs[ref]);
    }
    let results = filterComponents.reduce((data, child) => child.filter(data), rawData);
    return results;
  }

  render() {
    let layoutProps = { lgStyles: [], mdStyles: [], widths: []};
    let children = React.Children.map(this.props.children, (child, idx) => {
      layoutProps.lgStyles.push(this.style().lg);
      layoutProps.mdStyles.push(this.style().md);
      layoutProps.widths.push(12);
      return ( <div>
        {React.addons.cloneWithProps(child, {
          style: _.assign( { width: '100%', maxWidth: '360px' }, child.props.style),
          onChange: throttle(250, false, this.props.onChange, false),
          ref: `filter${idx}`
        })}
      </div> )}
    );
    return (
      <div>
        <Layout widths={_.assign({ md: layoutProps.widths }, this.props.widths)} cStyles={_.assign({ lg: layoutProps.lgStyles, md: layoutProps.mdStyles }, this.props.cStyles)} cPadding={this.props.cPadding} breakpoints={_.assign({ md: 1400 }, this.props.breakpoints)}>
          {children}
        </Layout>
      </div>
    )
  }
}

Filters.defaultProps = {
  cPadding: '0 20px 10px 0'
}

export default Filters;
