import React, { Component, addons, PropTypes } from 'react'
import Table from '../../shared/components/table'
import {Filters} from '../../shared/components/filteredCollection'

export default class Selector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: this.refs.selected.selectedRows(props.selected)
    });
  }

  componentDidMount() {
    this.updateSelected();
  }

  updateSelected() {
    console.log(this.refs.selected.state.active);
    this.setState({ selected: this.refs.selected.state.active });
  }

  render() {
    let CollectionChild = null;
    React.Children.forEach(this.props.children, child => {
      if(child.type == Table) {
        if (CollectionChild == null) {
            CollectionChild = addons.cloneWithProps(child, { data: this.props.data, ref: 'selected', onSelect: () => this.updateSelected() });
          } else {
            throw new Error('Only one collection component can be given to a FilteredCollection');
          }
        }
      }
    );

    return (
      <div>{CollectionChild}</div>
    )
  }
}
