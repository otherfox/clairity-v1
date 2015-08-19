import React, { Component, addons, PropTypes } from 'react'

export default class Selector extends Component {
  render() {
    let CollectionChild = null;
    React.Children.forEach(this.props.children, child => {
      if (CollectionChild == null) {
          CollectionChild = addons.cloneWithProps(child, { data: this.props.data });
        } else {
          throw new Error('Only one collection component can be given to a FilteredCollection');
        }
      }
    );

    return (
      <div>{CollectionChild}</div>
    )
  }
}
