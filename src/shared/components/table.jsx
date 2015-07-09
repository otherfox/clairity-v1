import React from 'react'
import Settings from './settings'
import {RaisedButton, Toggle, FloatingActionButton, FontIcon, Utils} from 'material-ui'

// This is for adding styles to fixed data table
import ThemeManager from '../themes/themeManager'
import useSheet from 'react-jss';

import {Table, Column, ColumnGroup as Group} from 'fixed-data-table'
import _ from 'lodash'

import numeral from 'numeral'
class StringCell extends React.Component {
  render() {
    return (<div>{this.props.children}</div>);
  }
}

class NumberCell extends React.Component {
  render() {
    return (
      <div>
        {numeral(this.props.children).format('0,0.0000')}
      </div>
    );
  }
}

class DateCell extends React.Component {
  formatDate(c) {
    if(c) {
      var d = new Date(c);
      c = d.toLocaleDateString();
    }
    return c;
  }
  render() {
    return (<div>{this.formatDate(this.props.children)}</div>);
  }
}

class CurrencyCell extends React.Component {
  render() {
    return (
      <div>
        {numeral(this.props.children).format('$0,0.00')}
      </div>
    );
  }
}

class UriCell extends React.Component {
  render() {
    return (
      <a href='#'>{this.props.children}</a>
    );
  }
}

class LinkCell extends React.Component {
  render() {

  }
}

class ButtonCell extends React.Component {
  render() {
    <div style={{textAlign: 'center'}} ><RaisedButton label={this.props.children} /></div>;
  }
}
const cellTypes = {
  string: StringCell,
  number: NumberCell,
  date: DateCell,
  currency: CurrencyCell,
  uri: UriCell,
  link: LinkCell,
  button: ButtonCell
};

let DataTable = React.createClass({

  propTypes: {
    colNames: React.PropTypes.array,
    data: React.PropTypes.array,
    colWidths : React.PropTypes.array,
    maxWidth: React.PropTypes.number,
    widthAdj: React.PropTypes.number,
    widthPerc: React.PropTypes.number,
    rowHeight: React.PropTypes.number,
    margin: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      widthPerc: 100,
      widthAdj: 0,
      rowHeight: 50
    }
  },

  rowGetter: function(rowIndex) {
      return this.props.data[rowIndex];
  },

  getWidth: function() {
    let widthPerc = this.props.widthPerc / 100;
    let width = widthPerc * (window.innerWidth - Settings.leftNavWidth - Settings.contentPadding - Settings.widthBuffer + this.props.widthAdj);
    let adjWidth = 0;

    this.props.colNames.forEach((col, i) => {
      adjWidth += this.getColWidth(i, width);
    });

    return adjWidth;
  },

  getColWidth: function(i, width) {

    width = width || this.state.width;

    if(this.props.colWidths) {
      return (Math.floor(width * (this.props.colWidths[i] / this.props.maxWidth)));
    } else {
      return (Math.floor(width / this.props.colNames.length));
    }
  },

  handleResize: function() {
    this.setState({width: this.getWidth()});
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  getInitialState: function() {
    return { width: this.getWidth(), active: '' };
  },

  style: function() {
    return {
      root: {
        width: '100%',
        margin: this.props.margin || "20px 0"
      }
    };
  },

  onRowClick: function(e, index) {
      this.setState({ active: index });
  },

  getRowClass: function(index) {
    const { classes } = this.props.sheet;
    var active = this.state.active;

    let selector = (index % 2 !== 0) ? 'even' : 'default';
    selector = (active === index ) ? 'active' : selector;

    let classNames = {
      active: classes.rowStyle,
      even: classes.rowStyleEven,
      default: classes.rowStyle
    }

    return classNames[selector];
  },

  formatCell: function(cell, col) {
    let CellClass = _.isString(col.cellType) ?
      (cellTypes[col.cellType] || StringCell) :
      col.cellType;
    return <CellClass {...col.props}>{cell}</CellClass>;
  },

  render: function() {



    let columns =
      <Group fixed={true}>
        {
          this.props.colNames.map((col, i) =>
            <Column
              label={col.label}
              key={i}
              dataKey={col.name || i}
              width={this.getColWidth(i)}
              cellRenderer={
                function(cellData) {
                  return this.formatCell(cellData, col);
                }.bind(this)
              }/>
          , this)
        }
      </Group>;
    let height = (((this.props.data.length * this.props.rowHeight) + 52) < window.innerHeight - 300) ? (this.props.data.length * this.props.rowHeight) + 52 : window.innerHeight - 300;

    return (

      <div style={_.assign(this.style(), this.props.style)}>
        <Table
          rowHeight={this.props.rowHeight}
          onRowClick={this.onRowClick}
          rowGetter={this.rowGetter}
          rowsCount={this.props.data.length}
          rowClassNameGetter={this.getRowClass}
          width={this.getWidth()}
          height={height}
          headerHeight={50}>
            {columns}
        </Table>
      </div>
    );
  }
});

const styles = {
  rowStyle: {
    'background-color': Utils.ColorManipulator.lighten(ThemeManager.getCurrentTheme().palette.canvasColor, .5),
    'color': ThemeManager.getCurrentTheme().palette.textColor,
  },
  rowStyleEven: {
    'background-color': Utils.ColorManipulator.darken(ThemeManager.getCurrentTheme().palette.canvasColor, .04),
    'color': ThemeManager.getCurrentTheme().palette.textColor,
  },
};

export default useSheet(DataTable, styles);;
