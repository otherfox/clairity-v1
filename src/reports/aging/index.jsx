import React, {PropTypes} from 'react'
import Layout from  '../../shared/components/layout'
import Header from  '../../shared/components/header'

import AgingSettings from './public/settings'
import AgingTable from './public/table'
import FilteredCollection from '../../shared/components/filteredCollection'

export default class AgingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  render() {
    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Header><h1>Aging Reports</h1></Header>
        <AgingSettings {...this.state}
                       onStatusChange={s => this.setState({status: s})}
                       onNonzeroChange={n => this.setState({nonzero: n})}
                       onDateChange={d => this.setState({date: d})} />
        <AgingTable {...this.state} />
      </Layout>
    );
  }
}
