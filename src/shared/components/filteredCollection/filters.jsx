import React, {Component} from 'react'
import Filter from './filter'
import _ from 'lodash'

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

  onChange(filter) {
    this.props.handleOnChange(filter);
  }

  render() {
    let children = React.Children.map(this.props.children, (child, idx) =>
      React.addons.cloneWithProps(child, {
        style: _.assign(this.style().filter, child.props.style),
        onChange: filter => this.onChange(filter)
      }));
    return (
      <div>{children}</div>
    )
  }
}

export default Filters;
