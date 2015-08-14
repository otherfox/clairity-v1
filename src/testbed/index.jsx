/**
 * This page is purely for testing components, making sure new features work,
 * etc.
 */

import React, {PropTypes} from 'react'
import {contextTypes} from '../shared/decorators'
import {PieGraph, BarGraph, LineGraph, ScatterPlotGraph, AreaGraph} from '../shared/components/graphs'
import {networkCollectionRendererByProp} from '../shared/components/networkRenderer'
import { State } from 'react-router'

@contextTypes({muiTheme: PropTypes.object})
class TestbedView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let data = [["2015-08-01",150000,150000],["2015-08-02",0,150000],["2015-08-03",0,150000],["2015-08-04",0,150000],["2015-08-05",0,150000],["2015-08-06",0,150000],["2015-08-07",0,150000],["2015-08-08",0,150000],["2015-08-09",0,150000],["2015-08-10",0,150000],["2015-08-11",0,150000],["2015-08-12",0,150000],["2015-08-13",0,150000],["2015-08-14",0,150000],["2015-08-15",100000,250000],["2015-08-16",0,250000],["2015-08-17",0,250000],["2015-08-18",0,250000],["2015-08-19",0,250000],["2015-08-20",0,250000],["2015-08-21",0,250000],["2015-08-22",0,250000],["2015-08-23",0,250000],["2015-08-24",0,250000],["2015-08-25",150000,400000],["2015-08-26",0,400000],["2015-08-27",0,400000],["2015-08-28",0,400000],["2015-08-29",0,400000],["2015-08-30",0,400000],["2015-08-31",0,400000]];
    return (
      <div style={{backgroundColor: this.context.muiTheme.palette.canvasColor}}>
        <PieGraph />
        <BarGraph />
        <LineGraph data={data}/>
        <ScatterPlotGraph />
        <AreaGraph />
      </div>
    );
  }
}

// let Testbed = networkCollectionRendererByProp(TestbedView, {table: 'sale', viaTable: 'month', idName: 'month'});

let TestbedPage = React.createClass({
  mixins: [State],
  render() {
    return <TestbedView month={0} />;
  }
});

export default TestbedPage;
