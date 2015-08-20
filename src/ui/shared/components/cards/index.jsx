import React from "react"
import { Paper, RaisedButton, Card, CardHeader, CardActions, CardText, CardMedia, FlatButton, Avatar, CardTitle } from 'material-ui'
import ReactGridLayout from 'react-grid-layout'
import Layout from '../layout'
import { CardTypes } from './cards'

let ResponsiveReactGridLayout = ReactGridLayout.Responsive;

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: {lg: this.generateLayout(this.props, 'lg'), md: this.generateLayout(this.props, 'md')},
      currentBreakpoint: 'lg',
      data: this.props.data,
      dom: this.generateDOM(this.props),
      end: 11,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data,
      layouts: {lg: this.generateLayout(props), md: this.generateLayout(props, 'md')},
      dom: this.generateDOM(props)});
  }

  componentDidMount() {
    window.addEventListener('scroll', e => this.handleScroll());
  }

  handleScroll() {
    let scrollPos = (document.body.scrollTop+window.innerHeight)/document.body.offsetHeight;
    if(scrollPos > .7) {
      this.setState({ end: this.state.end + 12}, e => this.setState({dom: this.generateDOM(this.props), layouts: {lg: this.generateLayout(this.props, 'lg'), md: this.generateLayout(this.props, 'md')}}));
    }
  }

  generateDOM(props) {
    let breakpoint = (this.state) ? this.state.currentBreakpoint : 'lg';
    let end = (this.state) ? this.state.end : 11;
    let data = (this.state) ? this.state.data.slice(0, end) : props.data.slice(0, end);
    return _.map(data, function(l, i) {
      let cardData = [];
      for(let prop in data[i]) {
        if(_.find(props.colNames, 'name', prop)) {
          cardData.push((
            <div key={i}>{
              (typeof data[i][prop] === 'string') ?
                _.result(
                  _.find(props.colNames, 'name', prop),
                    'label')+': '+ data[i][prop]
              : data[i][prop]
            }</div>
          ));
        }
      }
      let CardClass = CardTypes[props.cardType];
      return (
        <CardClass {..._.assign(props, {data: data[i] ,key:i, i:i})}>
          { cardData
            .filter( r =>
              r.props.children.indexOf(
                _.result(_.find(props.colNames, {name: props.header}), 'label')
              ) == -1
            )
          }
        </CardClass>
      )}.bind(this)
    );
  }

  generateLayout(props, breakpoint) {
    let count = (this.state) ? this.state.end + 1 : 12 ;
    let maxCols = props.cols[breakpoint];
    return _.map(_.range(0, count), (item, i) => {
      var y = props.rowHeight;
      return {
        x: (i + maxCols) % maxCols,
        y: Math.floor(i / 4) * y,
        w: 1,
        h: y,
        i: i,
        static: false
      };
    });
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  render() {
    console.log(this.state.data.length);
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
      <div style={{position: 'relative', marginRight: '5px', marginLeft: '-5px'}} id={'cards'}>
          <ResponsiveReactGridLayout
              layouts={this.state.layouts}
              onBreakpointChange={e => this.onBreakpointChange()}
              useCSSTransforms={false}
              isDraggable={(this.props.draggable) ? true: false}
              isResizable={(this.props.resizable) ? true: false}
              {...this.props}>
                {this.state.dom}
          </ResponsiveReactGridLayout>
        </div>
      </Layout>
    );
  }
}

Cards.defaultProps = {
  data: [],
  className: "layout",
  rowHeight: 14,
  cols: {lg: 4, md: 3, sm: 2, xs: 1, xxs: 1},
  cardType: 'default'
}

export default Cards;
