import React from 'react'
import Filters from './filters'

class FilteredCollection extends React.Component {
  render() {
    let children = React.Children.map(this.props.children, (child, idx) => {
      if(child.type === Filters) {
        return React.cloneElement(child)
      }
    });
    return (
      <div>{children}</div>
    )
  }
}

export default FilteredCollection;
