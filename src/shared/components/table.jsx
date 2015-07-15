import React from 'react'
import Settings from './settings'
import {TextField, RaisedButton, Toggle, FloatingActionButton, FontIcon, Utils, Styles} from 'material-ui'
import {Table, Column, ColumnGroup as Group} from 'fixed-data-table'
import Details from './details'
import {Typeahead} from './typeahead'
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
    margin: React.PropTypes.string,
    flexGrow: React.PropTypes.array,
    filters: React.PropTypes.object,
    sortBy: React.PropTypes.string
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      widthPerc: 100,
      widthAdj: 0,
      rowHeight: 50,
      flexGrow: []
    }
  },

  getInitialState() {
    return {
      data: this.props.data,
      width: this.getWidth(),
      active: '',
      sorted: {},
      filters: {},
      height: this.calcHeight()
    }
  },

  calcHeight() {
    return (((this.props.data.length * this.props.rowHeight) + 52) < window.innerHeight - 300) ? (this.props.data.length * this.props.rowHeight) + 52 : window.innerHeight - 300;
  },

  rowGetter: function(rowIndex) {
      return this.state.data[rowIndex];
  },

  getWidth: function() {
    let widthPerc = this.props.widthPerc / 100;
    let width = widthPerc * (window.innerWidth - Settings.leftNavWidth - Settings.contentPadding - Settings.widthBuffer + this.props.widthAdj);
    return width;
  },

  getColWidth: function(i) {
     let width = this.props.maxWidth;
     if(this.props.colWidths) {
       return (this.props.colWidths[i] / width);
     } else {
       return 100;
     }
  },

  getHeader(col, i) {
    return <div style={_.assign(col.style)} onClick={this.sortData.bind(this, col)}>{col.label} <FontIcon className="muidocs-icon-action-home" /></div>
  },

  sortData(col, e) {
    let name = col.name;
    let obj = {}

    if(typeof this.state.sorted[name] === 'undefined' || this.state.sorted[name] === 'dsc') {
      this.setState( {data: this.state.data.sort(function(a, b) {
        let first = a[col.name].replace(/\W/g, '');
        let second = b[col.name].replace(/\W/g, '');
        return first.localeCompare(second);
      }), sorted: {[name]: 'asc'} });
    } else if (this.state.sorted[name] === 'asc') {
      this.setState( {data: this.state.data.sort(function(a, b) {
        let first = a[col.name].replace(/\W/g, '');
        let second = b[col.name].replace(/\W/g, '');
        return second.localeCompare(first);
      }), sorted: {[name]: 'dsc'} });
    }
  },

  handleResize: function() {
    this.setState({width: this.getWidth()});
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
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
    return (this.state.active === index ) ? 'active' : '';
  },

  formatCell: function(cell, col) {
    let CellClass = _.isString(col.cellType) ?
      (cellTypes[col.cellType] || StringCell) :
      col.cellType;
    return <CellClass {...col.props}>{cell}</CellClass>;
  },

  setFilters(filterName) {
    return event => {
      let value = event.target.value;
      let output = _.filter(this.props.data, row => _.contains(row[filterName].toLowerCase(), value.toLowerCase()));
      this.setState({
        data: output,
        filters: _.assign(this.state.filters,{[filterName]: value })
      });
    }
  },

  clearFilters() {
    this.setState({ data : this.props.data, height: this.calcHeight() });
  },

  filter(event) {
    let output = _.filter(this.props.data, {[filterName] : event});
    this.setState( { data: output});
  },

  render: function() {
    let filters = (this.props.filters) ? <Details
      widths={this.props.filters.widths || {lg: ['auto', '320px']}}
      rowStyle={this.props.filters.rowStyle || { float: 'left' }}
      cStyles={this.props.filters.cStyles || {lg: [{textAlign: 'left'}]}}
      cStyle={this.props.filters.cStyle}
      cPadding={this.props.filters.cPadding || '0 20px 30px 0'}
      data={
        _.map(this.props.filters.data, (filter, i) => {
          if(filter.filterType === 'typeahead') {
            return { label: filter.label, value: <TextField onChange={this.setFilters(filter.name)} />, detailType: 'muiTextField' }
          }
          else if (filter.filterType === 'button') {
            return { label: '', value: <div><RaisedButton primary label={'Filter'} onClick={this.filter} /><RaisedButton style={{marginLeft: '20px'}} label={'Clear'} onClick={this.clearFilters} /></div>, detailType: 'muiTextField'}
          }
        })
      }
    /> : '';
    let columns =
      <Group fixed={true}>
        {
          this.props.colNames.map((col, i) =>
            <Column
              label={col.label}
              key={i}
              headerRenderer={
                function() {
                  return this.getHeader(col, i);
                }.bind(this)
              }
              dataKey={col.name || i}
              width={this.getColWidth(i)}
              flexGrow={(this.props.flexGrow.length > 0) ? this.props.flexGrow[i] : 1 }
              cellRenderer={
                function(cellData) {
                  return this.formatCell(cellData, col);
                }.bind(this)
              }/>
          , this)
        }
      </Group>;

    return (
      <div style={_.assign(this.style().root, this.props.style)}>
        <style>
          {`
            /* Fix for dynamic cell constructors. */
            .public_fixedDataTable_bodyRow .public_fixedDataTableCell_wrap3 {
                padding: 8px;
            }

            /* Fix gradient header */
            .public_fixedDataTable_header, .public_fixedDataTable_header .public_fixedDataTableCell_main {
              background-image: none;
              background-color: ${this.context.muiTheme.palette.canvasColor};
              color: ${this.context.muiTheme.palette.primary1Color};
              border: none;
            }

            .public_fixedDataTable_header {
              background: transparent;
            }

            .public_fixedDataTable_header .public_fixedDataTableCell_main {
                border-bottom: 3px solid ${this.context.muiTheme.palette.primary1Color};
                cursor: pointer;
            }

            /* Fix z-index and border */
            .public_fixedDataTable_main {
              z-index: 0;
            }

            /* changes border color */
            .public_fixedDataTable_header,
            .fixedDataTable_hasBottomBorder,
            .public_fixedDataTableCell_main,
            .fixedDataTableColumnResizerLine_main,
            .fixedDataTableRow_fixedColumnsDivider,
            .public_fixedDataTable_main {
              border-color: ${Utils.ColorManipulator.fade(this.context.muiTheme.palette.textColor, 0.15)};
            }

            /* removes background colors */
            .public_fixedDataTableCell_main {
              background-color: ${Utils.ColorManipulator.fade(this.context.muiTheme.palette.canvasColor, 0.9)};
              color: ${this.context.muiTheme.palette.textColor};
            }
            .public_fixedDataTableRow_highlighted, .public_fixedDataTableRow_highlighted .public_fixedDataTableCell_main {
              background-color: ${Utils.ColorManipulator.darken(this.context.muiTheme.palette.canvasColor, 0.04)};
              color: ${this.context.muiTheme.palette.textColor};
            }
          `}
        </style>
        {filters}
        <Table
          rowHeight={this.props.rowHeight}
          onRowClick={this.onRowClick}
          rowGetter={this.rowGetter}
          rowsCount={this.state.data.length}
          rowClassNameGetter={this.getRowClass}
          width={this.getWidth()}
          height={this.state.height}
          headerHeight={50}>
            {columns}
        </Table>
      </div>
    );
  }
});

export default DataTable;
