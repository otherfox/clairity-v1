/**
 * This page is purely for testing components, making sure new features work,
 * etc.
 */

import React, {PropTypes} from 'react'
import {contextTypes} from '../shared/decorators'
import {PieGraph, BarGraph, LineGraph, ScatterPlotGraph, AreaGraph} from '../shared/components/graphs'

@contextTypes({muiTheme: PropTypes.object})
class TestbedPage extends React.Component {
  render() {
    return (
      <div style={{backgroundColor: this.context.muiTheme.palette.canvasColor}}>
        <PieGraph />
        <BarGraph />
        <LineGraph />
        <ScatterPlotGraph />
        <AreaGraph />
      </div>
    );
  }
}

export default TestbedPage;
