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
import Details from '../../shared/components/details'
import DropDown from '../../shared/components/dropDown'

import WorkOrder from '../services/stubs/order1583.json'
import Contract from '../services/stubs/contract7416.json'

import {List, Map, fromJS} from 'immutable'

let WorkOrderDetails = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    order: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      order: fromJS(WorkOrder)
    };
  },

  style() {
    let style = {};

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  getDetails(order) {

    let owners = [{value: 'Owner',label:'Label'}];

    let colNames = [
      { label: 'Owners', name: 'owners', value: order.get['owner'], cellType: 'string' },
      { label: 'Work Order Status', name: 'status', value: order.getIn(['status', 'name']), cellType: 'string' },
      { label: 'Work Order Type', name: 'owners', value: 'Type', cellType: 'string' },
      { label: 'Description', name: 'owners', value: order.getIn(['status', 'name']), cellType: 'string' },
      { label: 'Services', name: 'owners', value: order.getIn(['status', 'name']), cellType: 'string' },
      { label: 'Expected Install Date (Earliest)', value: order.getIn(['status', 'name']), cellType: 'string' },
      { label: 'Expected Install Data (Latest)', value: order.getIn(['status', 'name']), cellType: 'string' },
      { label: 'Install Date', name: 'owners', value: order.getIn(['status', 'name']), cellType: 'string' },
      { label: 'Close Date', name: 'owners', value: order.getIn(['status', 'name']), cellType: 'string' },
      { label: 'notes', name: 'owners', value: order.getIn(['status', 'name']), cellType: 'string' },
    ];
    let c = {};
    colNames.forEach((col, idx) => { c[col.name] = col.value;});
    let data = [c];

    let table = {
      colNames: colNames,
      data: data,
      colWidths: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      maxWidth: 36,
      widthAdj: -60,
      margin: '20px 0 5px 0'
    };

    let details = {data: colNames};

    return details;

  },

  render() {



    return (
      <div style={this.style()}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{ lg: [12,12,12], md: [12,12,12], sm: [12,12,12], xs: [12,12,12], xxs: [12,12,12]}} pPadding={'0 20px 20px 20px'} cPadding={'0 0 20px 0'}>
            <div>
              <h3>Details</h3>
            </div>
            <div>
              <Details {...this.getDetails(this.props.order)} />
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default WorkOrderDetails;
