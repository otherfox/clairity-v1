import React from 'react'
import Filter from './filter'
import _ from 'lodash'

class Filters extends React.Component {
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
  render() {
    let children = React.Children.map(this.props.children, (child, idx) => React.addons.cloneWithProps(child, {style: _.assign(this.style().filter, child.props.style) }));
    return (
      <div>{children}</div>
    )
  }
}

export default Filters;
