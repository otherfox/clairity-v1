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
      layouts: {
        lg: this.generateLayout(this.props, 'lg'),
        md: this.generateLayout(this.props, 'md'),
        sm: this.generateLayout(this.props, 'sm')
      },
      currentBreakpoint: 'lg',
      data: this.props.data,
      dom: this.generateDOM(this.props),
      end: 11,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data,
      layouts: {
        lg: this.generateLayout(props, 'lg'),
        md: this.generateLayout(props, 'md'),
        sm: this.generateLayout(props, 'sm')
      },
      dom: this.generateDOM(props)});
  }

  componentDidMount() {
    window.addEventListener('scroll', e => this.handleScroll(this.props));
  }

  handleScroll(props) {
    let body = document.body;
    let scrollPos = (body.scrollTop + window.innerHeight) / body.offsetHeight;
    if(scrollPos > .7) {
      this.setState({
          end: this.state.end + 12
        },
        e => this.setState({
          dom: this.generateDOM(this.props),
          layouts: {
            lg: this.generateLayout(this.props, 'lg'),
            md: this.generateLayout(this.props, 'md'),
            sm: this.generateLayout(this.props, 'sm')
          }
        }
      ));
    }
  }

  generateDOM(props) {
    let end = (this.state) ? this.state.end : 12;
    let data = props.data.slice(0, end);
    return data.map((r, i) => {
      let CardClass = CardTypes[props.cardType];
      let {data, ...other} = props;
      return (
        <CardClass {...other} data={r} key={i} i={i} />
      )});
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
    return (
      <Layout widths={{}} cPadding={'20px 0 0 0'}>
        <div  style={{
                position: 'relative',
                marginRight: '5px',
                marginLeft: '-5px'
              }}
              id={'cards'}>
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
