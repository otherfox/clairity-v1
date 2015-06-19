import React from 'react'
import Settings from '../../shared/components/settings'
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

import Layout from '../../shared/components/layout'

import controllable from 'react-controllables'

import {fetchWorkOrder, updateWorkOrder} from '../actions.js'
import {queryWorkOrder} from '../queries.js'
import {Navigation} from 'react-router'

let LocationInfo = React.createClass ({

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

  updateState() {
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
    let id = this.props.id;
    updateWorkOrder(id, this.state.order);
  },

  handleWorkOrderOwnerChange() {
    return {};
  },

  render() {
    return (
      <div style={this.style()}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{ lg: [12,12,12], md: [12,12,12], sm: [12,12,12], xs: [12,12,12], xxs: [12,12,12]}} pPadding={'0 20px 20px 20px'} cPadding={'0 0 20px 0'}>
            <div>
              {this.state.order.get('location_id')}
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default LocationInfo;
