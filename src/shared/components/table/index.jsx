import React from 'react'
import Settings from '../settings'
import {TextField, RaisedButton, Toggle, FloatingActionButton, FontIcon, Utils, Styles, RadioButtonGroup, RadioButton, Checkbox } from 'material-ui'

import {CellTypes} from './tableCells'

import {Table, Column, ColumnGroup as Group} from 'fixed-data-table'
import Details from '../details'
import fuzzy from 'fuzzy'
import _ from 'lodash'

import ArrowDropDown from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import ArrowDropUp from 'material-ui/lib/svg-icons/navigation/arrow-drop-up'

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
    sortBy: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      widthPerc: 100,
      widthAdj: 0,
      rowHeight: 50,
      flexGrow: []
    }
  },

  getInitialState: function() {

    let data = (this.props.filters.active) ? this.setFiltersOnLoad(this.props.filters) : { output: this.props.data, filters: {}};

    return {
      data: data.output,
      width: this.getWidth(),
      active: '',
      sorted: {},
      filters: data.filters,
      height: this.getHeight()
    }
  },

  componentWillReceiveProps: function(props) {
    this.setState({data: props.data});
  },

  getHeight: function() {
    return (((this.props.data.length * this.props.rowHeight) + 52) < window.innerHeight - 300) ? (this.props.data.length * this.props.rowHeight) + 52 : window.innerHeight - 300;
  },

  getWidth: function() {
    let widthPerc = this.props.widthPerc / 100;
    let width = (window.innerWidth > Settings.breakpoints.sm) ? widthPerc * (window.innerWidth - Settings.leftNavWidth - Settings.contentPadding - Settings.widthBuffer + this.props.widthAdj) : widthPerc * (window.innerWidth - Settings.mobilePadding + this.props.widthAdj) ;
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

  rowGetter: function(rowIndex) {
      return this.state.data[rowIndex];
  },

  getHeader(col, i) {
    let sortIcon = '';

    if (this.state.sorted[col.name]) {
      sortIcon = (this.state.sorted[col.name] === 'asc') ? <ArrowDropDown style={this.style().icon} /> : <ArrowDropUp style={this.style().icon} /> ;
    }

    return <div style={_.assign(col.style)} onClick={this.sortData.bind(this, col)}>{col.label} {sortIcon}</div>
  },

  sortData: function(col, e) {

    let name = col.name;
    let obj = {}

    if(typeof this.state.sorted[name] === 'undefined' || this.state.sorted[name] === 'dsc') {
      this.setState( {data: _.sortBy( this.state.data, name), sorted: {[name]: 'asc'} });
    } else if (this.state.sorted[name] === 'asc') {
      this.setState( {data: _.sortBy( this.state.data, name).reverse(), sorted: {[name]: 'dsc'} });
    }
  },

  handleResize: function() {
    this.setState({width: this.getWidth(), height: this.getHeight()});
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  style: function() {
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
  },

  onRowClick: function(e, index) {
      this.setState({ active: index });
  },

  getRowClass: function(index) {
    return (this.state.active === index ) ? 'active' : '';
  },

  formatCell: function(rowData, col, width, rowIndex) {
    let CellClass = _.isString(col.cellType) ?
        (CellTypes[col.cellType] || CellTypes.string)
      :
        col.cellType;
    return (
      <CellClass {...col.props} data={rowData} width={width} index={rowIndex}>
        {rowData[col.name]}
      </CellClass>
    );
  },

  setFiltersOnChange(filter) {
    return event => {
      let opp = (filter.not) ? true : false;
      let value = ((event.target.type === 'checkbox' && !event.target.checked) || event.target.value === '') ? '' : [event.target.value, opp];
      let filters = _.omit(_.assign(this.state.filters,{[filter.name]: value }), _.isEmpty);
      let ids = this.getFilteredIds(filters);
      let data = this.getData(ids, filters);
      this.setDataState(data);
    }
  },

  setFiltersOnLoad(filters) {
    let filterState = {}
    _.forEach( filters.active, (filterName) => {
      let idx = _.findIndex(filters.data, 'name', filterName );
      filterState = _.assign(filterState,{[filterName]: [filters.data[idx].value, filters.data[idx].not] });
    });
    let ids = this.getFilteredIds(filterState);
    return this.getData(ids, filterState);
  },

  getFilteredIds(filters) {
    let ids = [];

    _.forEach( _.keys(filters), (filterName, idx) => {
      let options = _.map(this.props.data, row => row[filterName]);
      let index = _.findIndex(this.props.filters.data, function(filter) { return filter.name == filterName; });
      ids[idx] = (this.props.filters.data[index].fuzzy === false ) ?
        _.filter(
          _.map(options, (row, idx) => {
            let filterValue = (isNaN(filters[filterName][0])) ? filters[filterName][0] : +filters[filterName][0];
            let compare = (isNaN(filterValue)) ? _.contains(row, filterValue) : _.isEqual(row, filterValue);
            compare = (filters[filterName][1]) ? !compare : compare;
            return (compare) ? idx : '';
          }),
        row => _.isNumber(row))
        : fuzzy.filter(filters[filterName][0], options).map( res => res.index);
    });

    return ids;
  },

  getData(ids, filters) {
    if(ids.length > 1){
      let outputIds = [];
      for(let i = 0; i < ids.length - 1; i++) {
        let start = (outputIds.length > 0) ? outputIds : ids[i];
        outputIds = _.intersection(start,ids[i+1]);
      }
      ids = outputIds;
    } else {
      ids = (ids.length > 0) ? ids[0] : _.map(_.keys(this.props.data), id => parseInt(id));
    }
    let output = _.map(ids, id => this.props.data[id]);

    return { output: output, filters: filters }
  },

  setDataState(data) {
    this.setState({
      data: data.output,
      filters: data.filters
    });
  },

  render: function() {
    let filters = (this.props.filters) ? <Details
      widths={this.props.filters.widths || {lg: ['auto', '320px']}}
      rowStyle={this.props.filters.rowStyle || { float: 'left' }}
      cStyles={this.props.filters.cStyles || {lg: [{textAlign: 'left'}]}}
      cStyle={this.props.filters.cStyle || {float: 'left'}}
      cPadding={this.props.filters.cPadding || '0 20px 30px 0'}
      data={
        _.map(this.props.filters.data, (filter, i) => {
          if(filter.filterType === 'muiTextField') {
            return { label: '' , value: <TextField  floatingLabelText={filter.label}
                                                    onChange={this.setFiltersOnChange(filter)} />, detailType: 'muiTextField', labelStyle: { padding: '0' } }
          } else if (filter.filterType === 'muiRadioButtons') {
            return { label: filter.label, value:
              <RadioButtonGroup name={filter.buttonGroup.name}
                                style={_.assign({float: 'left', width: 'initial'}, filter.buttonGroup.style)}
                                onChange={this.setFiltersOnChange(filter)}>
                {_.map( filter.buttons, button =>
                  <RadioButton  value={button.value}
                                label={button.label}
                                style={_.assign({float: 'left', width: 'initial', marginRight: '20px'}, button.style)}
                                defaultChecked={button.defaultChecked}/>
                )}
              </RadioButtonGroup>
            , rowStyle: {marginTop: '40px'}, detailType: 'muiRadioButtons' }
          } else if (filter.filterType === 'muiButton') {
            return { label: filter.label, value: <RaisedButton  label={filter.button.label}
                                                                href={filter.button.href}
                                                                primary={(filter.button.primary) ? true : false }
                                                                linkButton={(filter.button.linkButton) ? true : false } />, detaildetailType: 'muiButton', rowStyle:  {marginTop: '30px'}}
          } else if (filter.filterType === 'muiCheckBox') {
            return { label: '' , value: <Checkbox defaultChecked={filter.defaultChecked}
                                                  onCheck={this.setFiltersOnChange(filter)}
                                                  value={filter.value}
                                                  style={_.assign({}, filter.style)}
                                                  label={filter.label}/>, detailType: 'muiCheckBox', rowStyle: {marginTop: '40px'} }
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
          rowHeightGetter={this.getRowHeight}
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
