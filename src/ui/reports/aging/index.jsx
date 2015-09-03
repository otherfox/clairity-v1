import React, {PropTypes} from 'react'
import Layout from  '../../shared/components/layout'
import Header from  '../../shared/components/header'
import AgingTable from './public/table'

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
        <AgingTable {...this.state}
                    onDateChange={d => this.setState({date: d})} />
      </Layout>
    );
  }
}
