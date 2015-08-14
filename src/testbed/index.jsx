/**
 * This page is purely for testing components, making sure new features work,
 * etc.
 */

import React, {PropTypes} from 'react'
import {contextTypes} from '../shared/decorators'
import {PieGraph, BarGraph, LineGraphWithBrush, ScatterPlotGraph, AreaGraph} from '../shared/components/graphs'
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
    // let data = this.props.salesMetrics.map(r => ({x: new Date(r.id), y: r.running_sales}));
    // let domain = [_.min(data, r => new Date(r.id)), _.max(data, r => new Date(r.id))];
    return (
      <div style={{backgroundColor: this.context.muiTheme.palette.canvasColor}}>
        <PieGraph />
        <BarGraph />
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
