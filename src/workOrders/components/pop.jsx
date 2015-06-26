import React from 'react/addons'
let {LinkedStateMixin} = React.addons;
import Settings from '../../shared/components/settings'
import Layout from '../../shared/components/layout'
import DropDown from '../../shared/components/dropDown'
import Details from '../../shared/components/details'
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
//
import {fromJS, Map} from 'immutable'
import {networkCollectionRenderer} from '../../shared/components/networkRenderer'
import {queryAllPops} from '../../shared/queries/pop'
import {getPops} from '../../shared/services/pop'
//
// // Make available for use in all components
let widths = { lg: [12,12,12,12], md: [12,12,12,12], sm: [12,12,12,12], xs: [12,12,12,12], xxs: [12,12,12,12] };
let cPadding = '0 20px 20px 20px';
//
let ExistingPopsView = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState() {
    return { popId: this.props.workOrder.pop_id }
  },
  getMenuItems() {
    return this.props.pops
      .map(p => new Map({
        value: p.get('id'),
        label: p.get('name')
      }));
  },
  render() {
    return (
      <DropDown valueLink={this.linkState('popId')} menuItems={this.getMenuItems()} />
    );
  }
})
//
let ExistingPops = networkCollectionRenderer(ExistingPopsView, {
  tableName: 'pop',
  serviceMethod: getPops,
  propName: 'pops'
});

let NewPopForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {name: '', address: ''};
  },
  render() {
    return (
      <div>
        <Layout widths={{ lg: [6,6], md: [4,8], sm: [12,12], xs: [12,12], xxs: [12,12]}} cPadding={'0 20px 10px 0'}>
          <div style={{textAlign: 'right'}}><strong>POP Name</strong></div>
          <div><TextField valueLink={this.linkState('name')} /></div>
        </Layout>
        <Layout widths={{ lg: [6,6], md: [4,8], sm: [12,12], xs: [12,12], xxs: [12,12]}} cPadding={'0 20px 10px 0'}>
          <div style={{textAlign: 'right'}}><strong>POP Address</strong></div>
          <div><TextField valueLink={this.linkState('address')} /></div>
        </Layout>
      </div>
    );
  }
});

class UnknownPop extends React.Component {
  render() {
    return <div />;
  }
}

export default React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {
      popType: this.props.workOrder.pop_id ? 0 : 2,
    }
  },

  getPopDisplay(type) {
    return type === 0 ? ExistingPops : (type === 1 ? NewPopForm : UnknownPop)
  },

  render() {
    let PopDisplay = this.getPopDisplay(this.state.popType);
    return (
      <div style={this.props.style}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{lg:[12,12], md:[12,12], sm:[12,12], xs:[12,12]}} pPadding={'0 20px 20px 20px'}>
            <h3>POP Types</h3>
            <Details data={[
              {label: 'POP Type', value:<DropDown style={{}} menuItems={fromJS([{label: 'Existing POP', value: 0}, {label: 'New POP', value: 1}, {label: 'Unknown POP', value: 2}])} valueLink={this.linkState('popType')} />, detailType: 'muiDropDown'},
              {label: '', value:<PopDisplay {...this.props} ref="pop" />},
              {label: '', value:<RaisedButton onClick={() => this.refs.pop.submit()} primary label="Update" />, detailType: 'muiButton'}
            ]} />
          </Layout>
        </Paper>
      </div>
    );
  }
});
