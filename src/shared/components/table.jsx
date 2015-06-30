import React from 'react'
import Settings from './settings'
import {RaisedButton, Toggle, FloatingActionButton, FontIcon} from 'material-ui'
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
    margin: React.PropTypes.string
  },

  rowGetter: function(rowIndex) {
      return this.props.data[rowIndex];
  },

  getWidth: function() {
    let widthPerc = (this.props.widthPerc) ? this.props.widthPerc / 100 : 1;
    let width = widthPerc * (window.innerWidth - Settings.leftNavWidth - Settings.contentPadding - Settings.widthBuffer + this.props.widthAdj);
    return width;
  },

  getColWidth: function(i) {
    if(this.props.colWidths) {
      return (Math.round(this.state.width * (this.props.colWidths[i] / this.props.maxWidth)));
    } else {
      return (Math.round(this.state.width / this.props.colNames.length));
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
      width: this.state.width + "px",
      margin: this.props.margin || "20px 0"
    };
  },

  onRowClick: function(e, index) {
      this.setState({ active: index });
  },

  getRowClass: function(index) {

      var active = this.state.active;

      if( index === active ) {
        return 'active';
      }

      return;
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

    let height = (((this.props.data.length * 50) + 52) < window.innerHeight - 300) ? (this.props.data.length * 50) + 52 : window.innerHeight - 300;

    return (
      <div style={this.style()} className="table">
        <Table
          rowHeight={50}
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

export default DataTable;
