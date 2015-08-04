import React, {PropTypes} from 'react'
import Table from '../../../shared/components/table'
import {agingReportsFetched} from '../actions'
import {queryAll} from '../queries'
import {getAgingReports} from '../services'
import {
  collectionQuery,
  queryRenderer,
} from '../../../shared/components/networkRenderer'


import {FilteredCollection, Filters, Filter} from '../../../shared/components/filteredCollection'
import {RaisedButton} from 'material-ui'

class AgingTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: this.computeRows(props)
    };
  }

  shouldComponentUpdate(props, state) {
    if (props.date == this.props.date) return false;
    return true;
  }

  componentWillReceiveProps(next) {
    this.setState({
      rows: this.computeRows(next)
    });
  }

  computeRows(props) {
    return props.rows;
  }

  getAgingReportsTable(data){
    return {
      data: data,
      colNames: [
        { label: 'Customer', name: 'name',    cellType: 'account', props: { idField: 'id' } },
      	{ label: 'Status',   name: 'active',  cellType: 'boolean', props: {cellClasses: { Active: 'true', Inactive: 'false' }, cellStyle: {textAlign: 'center'}}, style: {textAlign: 'center'} },
        { label: 'Balance',  name: 'balance', cellType: 'currency'},
        { label: '0 - 30',   name: 'b_0_30',  cellType: 'currency'},
        { label: '31 - 60',  name: 'b_31_60', cellType: 'currency'},
        { label: '61 - 90',  name: 'b_61_90', cellType: 'currency'},
        { label: '91+',      name: 'b_91',    cellType: 'currency'},
        { label: 'Agent',    name: 'agent',   cellType: 'agent', props: { idField: 'agent_id' } },
        { label: 'Send Late Notice',    name: 'button', cellType: 'send'},
        { label: 'Last Weekly Notice',  name: 'weekly_late_notice_sent', cellType: 'date'},
        { label: 'Last Monthly Notice', name: 'late_notice_sent', cellType: 'date'},
        { label: 'State', name: 'state', cellType: 'string'},
      ],
      filters: {
        data: [
          {label: 'Customer', name: 'name', filterType: 'muiTextField'},
          {label: 'Status', filterType: 'muiRadioButtons', name: 'active', fuzzy: false, buttonGroup: { name: 'status', defaultSelected: 'Both'}, buttons: [
            { label: 'Active', value: 'Active'},
            { label: 'Inactive', value: 'Inactive'},
            { label: 'Both', value: '', defaultChecked: true}
          ] },
          {label: 'Hide $0 Balances', filterType: 'muiCheckBox', name: 'balance', fuzzy: false, defaultChecked: true, value: 0, not: true }
        ],
        active: ['balance']
      },
      rowHeight: 120,
      colWidths: [4,1,1,1,1,1,1,2,2,2,2,1],
      maxWidth: 19,
      widthAdj: -30
    }
  }

  render() {
    return (
      <div>
        <FilteredCollection data={this.state.rows}>
          <Filters active={['balance']}>
            <Filter type={'muiTextField'} name={'name'} label={'Customer'} defaultValue={'test'} />
            <Filter lable={'Status'} type={'muiRadioButtons'} name={'active'} fuzzy={false} buttonGroup={{name: 'status'}} options={[
              { label: 'Active', value: 'Active'},
              { label: 'Inactive', value: 'Inactive'},
              { label: 'Both', value: '', defaultChecked: true}
            ]} />
            <Filter type={'muiCheckBox'} label={'Hide $0 Balances'} name={'balance'} fuzzy={false} defaultValue={true} filterValue={0} not={true} />
          </Filters>
          <Table {...this.getAgingReportsTable(this.state.rows)} />
        </FilteredCollection>
      </div>
    );
  }
}

// ['balance', 'b_0_30', 'b_31_60','b_61_90','b_91']

export default queryRenderer(AgingTable, {
  queries: [
    {
      tableName: 'agingReport',
      propName: 'rows',
      shouldFetch: () => true,
      writeMethod: reports => agingReportsFetched(reports),
      serviceMethod: props => getAgingReports(props.date),
      cacheMethod: props => {
        let results = Store.data.get('agingReport').toList();
        return results.size > 0 ? results.toJS() : null;
      },
    }
  ]
});
