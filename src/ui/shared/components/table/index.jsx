import React from 'react'
import Settings from '../settings'
import {TextField, RaisedButton, Toggle, FloatingActionButton, FontIcon, Utils, Styles, RadioButtonGroup, RadioButton, Checkbox } from 'material-ui'

import {CellTypes} from './tableCells'

import {Table, Column, ColumnGroup as Group} from 'fixed-data-table'
import Details from '../details'
import fuzzy from 'fuzzy'
import _ from 'lodash'
import {contextTypes} from '../../decorators'

import ArrowDropDown from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import ArrowDropUp from 'material-ui/lib/svg-icons/navigation/arrow-drop-up'

@contextTypes({
  muiTheme: React.PropTypes.object
})
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: this.props.data,
        width: this.getWidth(),
        active: [],
        sorted: {},
        height: this.getHeight()
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillReceiveProps(props) {
    let name = _.keys(this.state.sorted)[0];
    if (name) {
      if(this.state.sorted[name] === 'asc') {
        this.setState( {data: _.sortBy( props.data, name) });
      } else {
        this.setState( {data: _.sortBy( props.data, name).reverse() });
      }
    } else {
      this.setState({data: props.data});
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    let columns =
      <Group fixed={true}>
        {
          this.props.colNames.map((col, i) =>
            <Column
              label={col.label}
              key={i}
              headerRenderer={() => this.getHeader(col, i)}
              dataKey={col.name || i}
              width={this.getColWidth(i)}
              minWidth={120}
              flexGrow={(this.props.flexGrow.length > 0) ? this.props.flexGrow[i] : 1 }
              cellRenderer={(cellData, cellDataKey, rowData, rowIndex, columnData, width) => this.formatCell(rowData, col, width, rowIndex)} />
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
                word-break: break-word;
            }

            /* Fix Select */
            .public_fixedDataTable_header,
            .fixedDataTable_hasBottomBorder,
            .public_fixedDataTableCell_main,
            .fixedDataTableColumnResizerLine_main,
            .fixedDataTableRow_fixedColumnsDivider,
            .public_fixedDataTable_main {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
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

            /* makes active class */
            .public_fixedDataTable_main .active .public_fixedDataTableCell_main {
              background-color: transparent;
            }
            .public_fixedDataTable_main .active {
              background-color: ${Utils.ColorManipulator.fade(this.context.muiTheme.palette.accent1Color, .3)}
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
              background-color: ${Utils.ColorManipulator.fade(this.context.muiTheme.palette.canvasColor, 0.96)};
              color: ${this.context.muiTheme.palette.textColor};
            }
            .public_fixedDataTableRow_highlighted, .public_fixedDataTableRow_highlighted .public_fixedDataTableCell_main {
              background-color: ${Utils.ColorManipulator.darken(this.context.muiTheme.palette.canvasColor, 0.04)};
              color: ${this.context.muiTheme.palette.textColor};
            }
          `}
        </style>
        <Table
          rowHeight={this.props.rowHeight}
          onRowMouseDown={(e, i) => this.onRowMouseDown(e, i)}
          onRowMouseEnter={(e, i) => this.onRowMouseEnter(e, i)}
          rowGetter={i => this.rowGetter(i)}
          rowsCount={this.props.data.length}
          rowClassNameGetter={i => this.getRowClass(i)}
          width={this.getWidth()}
          height={this.state.height}
          headerHeight={this.props.headerHeight}
          ref='internal'>
            {columns}
        </Table>
      </div>
    );
  }

  getHeight() {
    return  (((this.props.data.length * this.props.rowHeight) + this.props.headerHeight + 2) < window.innerHeight - (Settings.footerHeight + Settings.headerHeight)) ?
              (this.props.data.length * this.props.rowHeight) + this.props.headerHeight + 2 + this.props.heightAdj
              : window.innerHeight - (Settings.footerHeight + Settings.headerHeight) + this.props.heightAdj;
  }

  getWidth() {
    let widthPerc = this.props.widthPerc / 100;
    let width = (window.innerWidth > Settings.breakpoints.sm) ? widthPerc * (window.innerWidth - Settings.leftNavWidth - Settings.contentPadding - Settings.widthBuffer + this.props.widthAdj) : widthPerc * (window.innerWidth - Settings.mobilePadding + this.props.widthAdj) ;
    return width ;
  }

  getColWidth(i) {
    let width = _.sum(this.props.colWidths);
    let minWidth = this.props.minWidth || 1000;
    if(this.props.colWidths) {
      return (Math.round(this.props.colWidths[i] * minWidth / width));
    } else {
      return 100;
    }
  }

  rowGetter(rowIndex) {
    return this.state.data[rowIndex];
  }

  getHeader(col, i) {
    let sortIcon = '';
    if (this.state.sorted[col.name]) {
      sortIcon = (this.state.sorted[col.name] === 'asc') ? <ArrowDropDown style={this.style().icon} /> : <ArrowDropUp style={this.style().icon} /> ;
    }
    return <div style={_.assign(col.style)} onClick={this.sortData.bind(this, col)}>{col.label} {sortIcon}</div>
  }

  sortData(col, e) {
    let name = col.name;
    let obj = {}

    if(typeof this.state.sorted[name] === 'undefined' || this.state.sorted[name] === 'dsc') {
      this.setState( {data: _.sortBy( this.state.data, name), sorted: {[name]: 'asc'} });
    } else if (this.state.sorted[name] === 'asc') {
      this.setState( {data: _.sortBy( this.state.data, name).reverse(), sorted: {[name]: 'dsc'} });
    }
  }

  style() {
    return {
      root: {
        width: '100%',
        margin: this.props.margin || '0'
      },
      icon: {
        fill: this.context.muiTheme.palette.primary1Color,
        verticalAlign: 'middle'
      }
    };
  }

  onRowMouseDown(e, index) {
    if(this.state.active.indexOf(index) != -1) {
      this.setState({ active: _.remove(this.state.active, n => n!=index)}, () => this.props.onSelect(this.state.active));
    } else {
      this.setState({ active: this.state.active.concat(index) }, () => this.props.onSelect(this.state.active));
    }
  }

  selectedRows() {
    return this.state.active;
  }

  onRowMouseEnter(e, index) {
    e.preventDefault();
    if(e.buttons == 1 || e.buttons == 3){
      if(this.state.active.indexOf(index) != -1) {
        this.setState({ active: _.remove(this.state.active, n => n!=index)});
      } else {
        this.setState({ active: this.state.active.concat(index) });
      }
    }
  }

  getRowClass(index) {
    let highlighted = (this.props.rowSelect) ?
      _.includes(_.map(
        _.keys( this.props.rowSelect),
          key => !!(this.state.data[index][key] === this.props.rowSelect[key]))
        , true)
      : false;
    highlighted = (highlighted) ? 'highlighted' : '';
    let active = (_.includes(this.state.active, index)) ? 'active' : '';
    return highlighted+' '+active;
  }

  formatCell(rowData, col, width, rowIndex) {
    let CellClass = _.isString(col.cellType) ?
        (CellTypes[col.cellType] || CellTypes.string)
      :
        col.cellType || CellTypes.string;
    return (
      <CellClass {...col.props} data={rowData} width={width} index={rowIndex}>
        {rowData[col.name]}
      </CellClass>
    );
  }

  handleResize() {
    this.setState({width: this.getWidth(), height: this.getHeight()});
  }
}

DataTable.defaultProps = {
  widthAdj: 0,
  heightAdj: 0,
  widthPerc: 100,
  minWidth: false,
  rowHeight: 50,
  headerHeight: 50,
  flexGrow: []
}

export default DataTable;
