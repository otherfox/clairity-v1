/**
 * This page is purely for testing components, making sure new features work,
 * etc.
 */

import React, {PropTypes} from 'react'
import {contextTypes} from '../shared/decorators'
import {PieGraph, BarGraph, LineGraphWithBrush, ScatterPlotGraph, AreaGraph, LineGraph} from '../shared/components/graphs'
import {queryRenderer} from '../shared/components/networkRenderer'
import {salesMetricsFetched} from '../shared/actions/salesMetric'
import {querySalesMetrics} from '../shared/queries/salesMetric'
import {getSalesMetricsByMonth} from '../shared/services/opportunity'
import { State } from 'react-router'
import _ from 'lodash'

@contextTypes({muiTheme: PropTypes.object})
class TestbedView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let data = this.props.salesMetrics
      .map(r => {
        let x = new Date(r.id);
        return {x: x, y: r.running_sales}})
      .sort((a, b) => b.x - a.x );
    let domain = [_.min(data, r => r.x).x, _.max(data, r => r.x).x];
    return (
      <div style={{backgroundColor: this.context.muiTheme.palette.canvasColor}}>
        <PieGraph />
        <BarGraph />
        <LineGraph data={{label: '', values:data}} domain={domain} width={1000} />
        <LineGraphWithBrush />
        <ScatterPlotGraph />
        <AreaGraph />
      </div>
    );
  }
}

// let TestbedPage = React.createClass({
//   mixins: [State],
//   render() {
//     return <TestbedView month={0} />;
//   }
// });

export default queryRenderer(TestbedView, {
  queries: [{
    tableName: 'salesMetric',
    writeMethod: salesMetricsFetched,
    shouldFetch: e => e.state.data,
    cacheMethod: props => querySalesMetrics(props.month || '2015-08'),
    serviceMethod: props => getSalesMetricsByMonth(props.months_ago || 0),
    propName: 'salesMetrics'
  }]
});
