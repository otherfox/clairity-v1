import React, { Component, addons, PropTypes } from 'react'

export default class Selector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: this.refs.selected
    });
  }

  componentDidMount() {
    this.updateSelected();
  }

  updateSelected() {
    let selected = this.refs.selected;
    this.setState({ selected: selected });
  }

  render() {
    let CollectionChild = null;
    React.Children.forEach(this.props.children, child => {
      if (CollectionChild == null) {
          CollectionChild = addons.cloneWithProps(child, { data: this.props.data, ref: 'selected', onChange: () => this.updateSelected() });
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
