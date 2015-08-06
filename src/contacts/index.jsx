// This is start of the card view

import React from "react"
import {Paper, RaisedButton, Card, CardHeader, CardActions, CardText, CardMedia, FlatButton, Avatar, CardTitle} from 'material-ui'
import ReactGridLayout from 'react-grid-layout'
import Layout from '../shared/components/layout'

let ResponsiveReactGridLayout = ReactGridLayout.Responsive;

class ViewContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: {lg: this.generateLayout()},
      currentBreakpoint: 'lg'
    }
  }

  style() {
    return {
    }
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, function(l, i) {
      return (
        <Card key={i} className={l.static ? 'static' : ''} >
          <CardHeader
            title="Demo Url Based Avatar"
            subtitle="Subtitle"
            avatar="http://lorempixel.com/100/100/nature/"/>
          <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
            <img src="http://lorempixel.com/600/337/nature/"/>
          </CardMedia>
          <CardTitle title="Title" subtitle="Subtitle"/>
          <CardActions>
            <FlatButton label="Action1"/>
            <FlatButton label="Action2"/>
          </CardActions>
        </Card>
      );
    });
  }

  generateLayout() {
    var p = this.props;
    return _.map(_.range(0, 25), function(item, i) {
      var y = 16;
      return {x: _.random(0, 5) * 4 % 12, y: Math.floor(i / 4) * y, w: 4, h: y, i: i, static: Math.random() < 0.05};
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
        <RaisedButton onClick={e => this.onNewLayout()} label={'Generate New Layout'} />
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

ViewContact.propTypes = {
  onLayoutChange: React.PropTypes.func.isRequired
}

ViewContact.defaultProps = {
  className: "layout",
  rowHeight: 30,
  cols: {lg: 12, md: 8, sm: 4, xs: 4, xxs: 4}
}

export default ViewContact;
