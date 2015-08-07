import React from 'react'
import Settings from '../settings'
import {TextField, RaisedButton, Toggle, FloatingActionButton, FontIcon, Utils, Styles, RadioButtonGroup, RadioButton, Checkbox } from 'material-ui'

import {CellTypes} from './tableCells'

import {Table, Column, ColumnGroup as Group} from 'fixed-data-table'
import Details from '../details'
import fuzzy from 'fuzzy'
import _ from 'lodash'
import {contextTypes} from '../../decorators'
import controllable from 'react-controllables'

import ArrowDropDown from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import ArrowDropUp from 'material-ui/lib/svg-icons/navigation/arrow-drop-up'

@controllable(['data'])
@contextTypes({
  muiTheme: React.PropTypes.object
})
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: this.props.data,
        width: this.getWidth(),
        active: '',
        sorted: {},
        height: this.getHeight()
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    this.setState({width: this.getWidth(), height: this.getHeight()});
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

  componentWillDismount() {
    window.removeEventListener('resize', this.handleResize);
  }

  getHeight() {
    return (((this.props.data.length * this.props.rowHeight) + 52) < window.innerHeight - 300) ? (this.props.data.length * this.props.rowHeight) + 52 : window.innerHeight - 300;
  }

  getWidth() {
    let widthPerc = this.props.widthPerc / 100;
    let width = (window.innerWidth > Settings.breakpoints.sm) ? widthPerc * (window.innerWidth - Settings.leftNavWidth - Settings.contentPadding - Settings.widthBuffer + this.props.widthAdj) : widthPerc * (window.innerWidth - Settings.mobilePadding + this.props.widthAdj) ;
    return width;
  }

  getColWidth(i) {
     let width = this.props.maxWidth;
     if(this.props.colWidths) {
       console.log(this.props.colWidths[i] * 100 / width);
       return (this.props.colWidths[i] * 100 / width);
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

  onRowClick(e, index) {
      this.setState({ active: index });
  }

  getRowClass(index) {
    return (this.state.active === index ) ? 'active' : '';
  }

  formatCell(rowData, col, width, rowIndex) {
    let CellClass = _.isString(col.cellType) ?
        (CellTypes[col.cellType] || CellTypes.string)
      :
        col.cellType;
    return (
      <CellClass {...col.props} data={rowData} width={width} index={rowIndex}>
        {rowData[col.name]}
      </CellClass>
    );
  }

  render() {
    console.log('render', this.props.data.length);
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
        <Table
          rowHeight={this.props.rowHeight}
          onRowClick={i => this.onRowClick(i)}
          rowGetter={i => this.rowGetter(i)}
          rowsCount={this.props.data.length}
          rowClassNameGetter={i => this.getRowClass}
          width={this.getWidth()}
          height={this.state.height}
          headerHeight={50}>
            {columns}
        </Table>
      </div>
    );
  }
}

DataTable.defaultProps = {
  widthAdj: 0,
  widthPerc: 100,
  rowHeight: 50,
  flexGrow: []
}

export default DataTable;
