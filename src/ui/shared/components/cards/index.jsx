import React from "react"
import { Paper, RaisedButton, Card, CardHeader, CardActions, CardText, CardMedia, FlatButton, Avatar, CardTitle } from 'material-ui'
import ReactGridLayout from 'react-grid-layout'
import Layout from '../layout'
// import { CardTypes } from './cards'
let CardTypes = {};

let ResponsiveReactGridLayout = ReactGridLayout.Responsive;

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: {lg: this.generateLayout()},
      currentBreakpoint: 'lg',
      data: this.props.data,
      dom: this.generateDOM(),
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ data: props.data, layouts: {lg: this.generateLayout(props)}, dom: this.generateDOM(props) });
  }

  style() {
    return {}
  }

  generateDOM(props) {
    let data =  (props) ?
                  props.data
                  : (this.state) ?
                    this.state.data
                    : this.props.data;
    return _.map(data, function(l, i) {
      let props = [];
      for(let prop in data[i]) {
        if(_.find(this.props.colNames, 'name', prop)) {
          props.push((<div>{(typeof data[i][prop] === 'string') ? _.result(_.find(this.props.colNames, 'name', prop), 'label')+': '+data[i][prop] : data[i][prop]}</div>));
        }
      }
      let CardClass = CardTypes[this.props.cardType];
      return (
        <CardClass key={i} i={i} {...this.props}>
            {props}
        </CardClass>
      )}.bind(this)
    );
  }

  generateLayout(props) {
    let count = (props) ?
                  props.data.length
                  : (this.state) ?
                    this.state.data.length
                    : this.props.data.length;
    let maxCols = this.props.cols.lg;
    return _.map(_.range(0, count), (item, i) => {
      var y = this.props.rowHeight;
      return {x: (i + maxCols) % maxCols, y: Math.floor(i / 4) * y, w: 1, h: y, i: i, static: false};
    });
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  render() {
    return (
      <Layout widths={{}} cPadding={'20px 0 0 0'}>
        <style>{`
          .react-resizable {
            position: relative;
          }
          .react-resizable-handle.react-draggable {
            position: absolute;
            width: 20px;
            height: 20px;
            bottom: 0;
            right: 0;
            background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=);
            background-position: bottom right;
            padding: 0 3px 3px 0;
            background-repeat: no-repeat;
            background-origin: content-box;
            box-sizing: border-box;
            cursor: se-resize;
            /* Since this handle is absolutely positioned, we don't want the
               draggable transforms to actually move it */
            transform: none !important;
            -webkit-transform: none !important;
            -ms-transform: none !important;
            -o-transform: none !important;
            -moz-transform: none !important;
          }
        `}</style>
        <div style={{position: 'relative', marginRight: '5px', marginLeft: '-5px'}}>
          <ResponsiveReactGridLayout
              layouts={this.state.layouts}
              onBreakpointChange={e => this.onBreakpointChange()}
              useCSSTransforms={false}
              // isDraggable={false}
              // isResizable={false}
              {...this.props}>
            {this.state.dom}
          </ResponsiveReactGridLayout>
        </div>
      </Layout>
    );
  }
}

Cards.propTypes = {

}

Cards.defaultProps = {
  data: [],
  className: "layout",
  rowHeight: 14,
  cols: {lg: 4, md: 2, sm: 1, xs: 1, xxs: 1},
  cardType: 'default'
}

export default Cards;
