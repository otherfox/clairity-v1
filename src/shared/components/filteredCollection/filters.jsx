import React, {Component} from 'react'
import Filter from './filter'
import _ from 'lodash'
import {throttle} from 'throttle-debounce'

class Filters extends Component {
  style() {
    return {
      filter: {
        float: 'left',
        maxWidth: '360px',
        width: 'initial',
        marginRight: '30px'
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
    let results = filterComponents.reduce((data, child) => child.filter(data), rawData)
    return results;
  }

  render() {
    let children = React.Children.map(this.props.children, (child, idx) =>
      React.addons.cloneWithProps(child, {
        style: _.assign(this.style().filter, child.props.style),
        onChange: throttle(250, false, this.props.onChange, false),
        ref: `filter${idx}`
      }));
    return (
      <div>{children}</div>
    )
  }
}

export default Filters;
