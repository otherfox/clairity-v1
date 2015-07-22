import React, {PropTypes} from 'react'
import Table from '../../../shared/components/table'
import {ToggleCell, SendCell, UserCell} from './tableCells'
import {agingReportsFetched} from '../actions'
import {queryAll} from '../queries'
import {getAgingReports} from '../services'
import {
  collectionQuery,
  queryRenderer,
} from '../../../shared/components/networkRenderer'

let colNames = [
  { label: 'Customer', name: 'name',    cellType: 'uri', props: {href: '#'}},
	{ label: 'Status',   name: 'active',  cellType: ToggleCell },
  { label: 'Balance',  name: 'balance', cellType: 'currency'},
  { label: '0 - 30',   name: 'b_0_30',  cellType: 'currency'},
  { label: '31 - 60',  name: 'b_31_60', cellType: 'currency'},
  { label: '61 - 90',  name: 'b_61_90', cellType: 'currency'},
  { label: '91+',      name: 'b_91',    cellType: 'currency'},
  { label: 'Agent',    name: 'agent',   cellType: UserCell},
  { label: 'Send Late Notice',    name: 'button', cellType: SendCell},
  { label: 'Last Weekly Notice',  name: 'weekly_late_notice_sent', cellType: 'date'},
  { label: 'Last Monthly Notice', name: 'late_notice_sent', cellType: 'date'},
  { label: 'State', name: 'state', cellType: 'string'},
];

function checkStatus(row, status) {
  if (status == 'both') return true;
  return row.active.toLowerCase() == status;
}

function checkNonzero(row, nonzero) {
  if (!nonzero) return true;
  return row.balance != 0 ||
         row.b_0_30  != 0 ||
         row.b_31_60 != 0 ||
         row.b_61_90 != 0 ||
         row.b_91    != 0;
}

class AgingTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: this.computeRows(props)
    };
  }

  shouldComponentUpdate(props, state) {
    // if (props.status == this.props.status &&
    //     props.nonzero == this.props.nonzero &&
    //     props.date == this.props.date) return false;
    return true;
  }

  componentWillReceiveProps(next) {
    this.setState({
      rows: this.computeRows(next)
    });
    console.log('aging table gotProps', next);
    console.log('aging table updated state', this.state);
  }

  computeRows(props) {
    return props.rows.toList().toJS()
      .filter(r => checkStatus(r, props.status))
      .filter(r => checkNonzero(r, props.nonzero));
  }

  render() {
    window.agingTable = this;
    console.log('aging table render', this.state.rows, this.state.rows.length)
    return (
      <Table
        data={this.state.rows}
        colNames={colNames}
        colWidths={[4,1,1,1,1,1,1,2,2,2,2,1]}
        maxWidth={19} />
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
        let results = Store.data.get('agingReport');
        return results.size > 0 ? results : null;
      },
    }
  ]
});
