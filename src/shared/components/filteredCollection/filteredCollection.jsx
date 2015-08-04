import React from 'react'

class FilteredCollection extends React.Component {
  render() {
    let children = React.Children.map(this.props.children, (child, idx) => React.addons.cloneWithProps(child, {data: this.props.data}));
    return (
      <div>{children}</div>
    )
  }
}

export default FilteredCollection;
