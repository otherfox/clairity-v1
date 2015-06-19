import React from 'react'
import Settings from '../shared/components/settings'
import {
  RadioButtonGroup,
  RadioButton,
  Checkbox,
  FlatButton,
  RaisedButton,
  FloatingActionButton,
  IconButton,
  Toggle,
  Slider,
  DropDownMenu,
  DatePicker,
  TextField,
  Paper
} from 'material-ui'

import controllable from 'react-controllables'

import {fetchWorkOrder, updateWorkOrder} from './actions.js'
import {queryWorkOrder} from './queries.js'
import {Navigation} from 'react-router'

let WorkOrderDetails = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    id: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      id: 1538
    };
  },

  getInitialState() {
    return {};
  },

  updateState(msg) {
    this.setState(this.getStateFromStore());
  },

  componentWillMount() {
    let id = this.props.id;
    fetchWorkOrder(id);
  },

  componentDidMount() {
    this.updateState();
    Store.on('update', () => this.updateState('store updated'));
  },

  getStateFromStore() {
    return { order: queryWorkOrder(this.props.id) };
  },
  style() {
    let style = {};

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        console.log(key);
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  updateAddressField(fieldName) {
    return value => {
      this.setState({order: this.state.order.setIn(['address', fieldName], value)});
    }
  },

  updateOrder() {
    let id = this.getParams().id;
    updateWorkOrder(id, this.state.order);
  },

  render() {
    return (
      <div style={this.style()}>
        <h3>Work Order Details</h3>
      </div>
    );
  }
});

export default WorkOrderDetails;
