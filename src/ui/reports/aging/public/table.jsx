import React, { PropTypes } from 'react'
import Table from '../../../shared/components/table'
import { agingReportsFetched } from '../../../../core/actions/agingReport'
import { queryAll } from '../../../../core/queries/agingReport'
import { getAgingReports } from '../../../../core/services/agingReport'
import AgingSettings from './settings'
import {
  collectionQuery,
  queryRenderer,
} from '../../../shared/components/networkRenderer'

import async, { query } from '../../../shared/components/async'

import { FilteredCollection, Filters, CheckBoxFilter, TextFilter, RadioButtonFilter } from '../../../shared/components/filteredCollection'
import { RaisedButton } from 'material-ui'

class AgingTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: this.computeRows(props)
    };
  }

  componentWillReceiveProps(next) {
    this.setState({
      rows: this.computeRows(next)
    });
  }

  computeRows(props) {
    return props.rows.map(row => {
      row.has_zero_balance = row.balance == 0;
      return row;
    });
  }

  getAgingReportsTable(data){
    return {
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
      rowHeight: 120,
      headerHeight: 80,
      colWidths: [3,1,1,1,1,1,1,2,1,1,1,1],
      minWidth: 1400,
      widthAdj: -30,
      heightAdj: -60,
    }
  }

  render() {
    return (
      <div>
        <AgingSettings onDateChange={this.props.onDateChange} />
        <FilteredCollection data={this.state.rows}>
          <Filters active={['balance']}>
            <TextFilter name={'name'} label={'Customer'} />
            <RadioButtonFilter label={'Status'} name={'active'} buttonGroup={{name: 'status'}} options={[
              { label: 'Active', value: 'Active'},
              { label: 'Inactive', value: 'Inactive'},
              { label: 'Both', value: '', defaultChecked: true}
            ]} />
          <CheckBoxFilter label={'Hide $0 Balances'} not name={'has_zero_balance'} defaultValue={true} />
          </Filters>
          <Table {...this.getAgingReportsTable(this.state.rows)} />
        </FilteredCollection>
      </div>
    );
  }
}

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
