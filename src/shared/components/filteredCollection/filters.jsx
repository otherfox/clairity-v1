import React from 'react'
import Filter from './filter'

class Filters extends React.Component {
  render() {
    let children = React.Children.map(this.props.children, (child, idx) => {
      if(child.type === Filter) {
        return React.cloneElement(child)
      }
    });
    return (
      <div>{children}</div>
    )
  }
}

export default Filters;
