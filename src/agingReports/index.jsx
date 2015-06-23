import React from 'react'
import Layout from  '../shared/components/layout'
import Footer from  '../shared/components/footer'
import TopNav from '../shared/components/topnav'
import LeftNav from '../shared/components/leftnav'
import Table from '../shared/components/table'
import Content from '../shared/components/content'
import Filters from '../shared/components/filters'

import {fromJS, List} from 'immutable'

// TODO: Get view listening to the store correctly. (Generic solution?)
import Store from '../shared/store'

import {fetchAgingReports} from './actions'
import {queryActive, queryInactive, queryAll} from './queries'



// Filter components

import {
  RadioButton,
  RadioButtonGroup,
  Checkbox,
  FlatButton,
  RaisedButton,
  FloatingActionButton,
  IconButton,
  Toggle,
  Slider,
  DropDownMenu,
  DatePicker,
  TextField
} from 'material-ui'

import {ToggleCell, SendCell, UserCell} from './tableCells'

// Table Data
let colNames = [
  { label: 'Customer', cellType: 'uri', props: {href: '#'}},
	{ label: 'Status', cellType: ToggleCell },
  { label: 'Balance', cellType: 'currency'},
  { label: '0 - 30', cellType: 'currency'},
  { label: '31 - 60', cellType: 'currency'},
  { label: '61 - 90', cellType: 'currency'},
  { label: '91+', cellType: 'currency'},
  { label: 'Send Late Notice', cellType: SendCell},
  { label: 'Last Weekly Notice', cellType: 'date'},
  { label: 'Last Monthly Notice', cellType: 'date'},
  { label: 'Agent', cellType: UserCell},
  { label: 'State', cellType: 'string'},
];

export default class Aging extends React.Component {
  constructor() {
    super();
    this.state = {
      colNames: colNames,
      rows: fromJS({}),
      showZeros: false,
      filter: 'active'
    };
    this.getStateFromStore = this.getStateFromStore.bind(this);
  }
  updateState() {
    this.setState({rows: this.getState()});
  }
  getState() {
    return this.getStateFromStore(this.state.filter, this.state.showZeros);
  }
  getStateFromStore(filter, showZeros) {
    let data;
    if (filter === 'active') {
      data = queryActive(!showZeros);
    } else if (filter === 'inactive') {
      data = queryInactive(!showZeros);
    } else {
      data = queryAll(!showZeros);
    }
    return data;
  }
  componentWillMount() {
    fetchAgingReports();
  }
  componentDidMount() {
    this.updateState();
    Store.on('update', () => this.updateState());
  }
  componentWillDismount() {
    // TODO: Add a Store.off method
    //Store.off('update', this.getStateFromStore);
  }
  computeRows() {
    return this.state.rows.toList().toJS()
      .map(r => this.rowToArray(r));
  }

  formatCells(r) {

    // This is for special conditional formating
    r.button = r.button_disabled ? "" : "Send";

    return r;
  }
  rowToArray(r) {

    r = this.formatCells(r);

    return [
      r.name,
      r.active,
      r.balance, r.b_0_30, r.b_31_60, r.b_61_90, r.b_91,
      r.button,
      r.weekly_late_notice_sent,
      r.late_notice_sent,
      r.agent
    ];
  }
  handleFilterChange(e, value) {
    this.setState({
      filter: value,
      rows: this.getStateFromStore(value, this.state.checked)
    });
  }
  handleshowZerosChange(e, value) {
    this.setState({
      showZeros: value,
      rows: this.getStateFromStore(this.state.filter, value)
    });
  }
  render() {
    let rowsData = this.computeRows();
    return (
      <div>
        <TopNav />
        <div className="main">
          <Layout>
            <LeftNav />
            <Content>
              <Layout widths={{lg: [12], md: [12], sm: [12], xs: [12]}}>
                <div>
                  <div className="section-header">
                    <h1>Aging Reports</h1>
                  </div>
                  <Filters data={this.state.rows}>
                    <RadioButtonGroup name="status" valueSelected={this.state.filter} onChange={this.handleFilterChange.bind(this)}>
                      <RadioButton value="active" label="Acitve" />
                      <RadioButton value="inactive" label="Inactive"  defaultChecked={true} />
                      <RadioButton value="both" label="Both" />
                    </RadioButtonGroup>
                    <Checkbox  name="checkboxName1" value={this.state.showZeros} onCheck={this.handleshowZerosChange.bind(this)} label="Hide $0 Credit Balances" />
                    <DatePicker hintText="As of" mode="landscape" />
                  </Filters>
                  <Table
                    data={rowsData}
                    colNames={this.state.colNames}
                    colWidths={[4,1,1,1,1,1,1,2,2,2,2]}
                    maxWidth={18} />
                </div>
              </Layout>
            </Content>
          </Layout>
        </div>
        <Footer />
      </div>
    );
  }
};
