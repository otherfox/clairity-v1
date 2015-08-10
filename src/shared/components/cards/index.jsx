import React from "react"
import {Paper, RaisedButton, Card, CardHeader, CardActions, CardText, CardMedia, FlatButton, Avatar, CardTitle} from 'material-ui'
import ReactGridLayout from 'react-grid-layout'
import Layout from '../layout'

let ResponsiveReactGridLayout = ReactGridLayout.Responsive;

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: {lg: this.generateLayout()},
      currentBreakpoint: 'lg'
    }
  }

  style() {
    return {}
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, function(l, i) {
      return (
        <Card key={i} transitionEnabled={false}>
          <CardHeader
            title="Demo Url Based Avatar"
            subtitle="Subtitle"
            avatar="http://lorempixel.com/100/100/nature/"/>
          <CardTitle title="Title" subtitle="Subtitle"/>
          <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
            <img src="http://lorempixel.com/600/337/nature/"/>
          </CardMedia>
          <CardActions>
            <FlatButton label="Action1"/>
            <FlatButton label="Action2"/>
          </CardActions>
        </Card>

        // Material-ui Smoothness Test
        // <Paper key={i} transitionEnabled={false}>This is a Test</Paper>

        //  <Paper key={i}>This is a Test</Paper>

        // Regular Smoothness Test
        // <div key={i} style={{border: '1px solid #cccccc'}}>This is a Test</div>
      );
    });
  }

  generateLayout() {
    var p = this.props;
    return _.map(_.range(0, 25), function(item, i) {
      var y = 16;
      return {x: _.random(0, 5) % 3, y: Math.floor(i / 4) * y, w: 1, h: y, i: i, static: false};
    });
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  onNewLayout() {
    this.setState({
      layouts: {lg: this.generateLayout()}
    });
  }

  render() {
    return (
      <Layout widths={{}} cPadding={'20px 0 0 0'}>
        <div style={{position: 'relative', marginRight: '5px', marginLeft: '-5px'}}>
          <ResponsiveReactGridLayout
              layouts={this.state.layouts}
              onBreakpointChange={e => this.onBreakpointChange()}
              useCSSTransforms={true}
              {...this.props}>
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </Layout>
    );
  }
}

Cards.propTypes = {
  onLayoutChange: React.PropTypes.func.isRequired
}

Cards.defaultProps = {
  className: "layout",
  rowHeight: 30,
  cols: {lg: 3, md: 2, sm: 1, xs: 1, xxs: 1}
}

export default Cards;
