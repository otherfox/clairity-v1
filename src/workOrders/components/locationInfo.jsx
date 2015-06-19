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

import {fetchLocation} from '../../shared/actions/location'
import {queryLocation} from '../../shared/queries/location'
import {Navigation} from 'react-router'

import {Map} from 'immutable'

let LocationInfo = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    id: React.PropTypes.number
  },

  getInitialState() {
    return {
      location: undefined
    };
  },

  updateState() {
    this.setState(this.getStateFromStore());
  },

  componentWillMount() {
    let id = this.props.id;
    fetchLocation(id);
  },

  componentDidMount() {
    this.updateState();
    Store.on('update', () => this.updateState());
  },

  getStateFromStore() {
    return { location: queryLocation(this.props.id) };
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
    let loc = this.state.location || new Map();
    return (
      <div style={this.style()}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{ lg: [12,12,12], md: [12,12,12], sm: [12,12,12], xs: [12,12,12], xxs: [12,12,12]}} pPadding={'0 20px 20px 20px'} cPadding={'0 0 20px 0'}>
            <div>
              {loc.get('id')}
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default LocationInfo;
