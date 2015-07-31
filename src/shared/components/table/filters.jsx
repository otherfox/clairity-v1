import React from 'react'
import Settings from '../settings'
import {TextField, RaisedButton, Toggle, FloatingActionButton, FontIcon, Utils, Styles, RadioButtonGroup, RadioButton, Checkbox } from 'material-ui'

import {CellTypes} from './tableCells'

import {Table, Column, ColumnGroup as Group} from 'fixed-data-table'
import Details from '../details'
import fuzzy from 'fuzzy'
import _ from 'lodash'
import controllable from 'react-controllables'
import {contextTypes} from '../../decorators'

import ArrowDropDown from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import ArrowDropUp from 'material-ui/lib/svg-icons/navigation/arrow-drop-up'

@contextTypes({
  muiTheme: React.PropTypes.object
})

class Filters extends React.Component {
  setFiltersOnChange(filter) {
    return event => {
      let opp = (filter.not) ? true : false;
      let value = ((event.target.type === 'checkbox' && !event.target.checked) || event.target.value === '') ? '' : [event.target.value, opp];
      let filters = _.omit(_.assign(this.state.filters,{[filter.name]: value }), _.isEmpty);
      let ids = this.getFilteredIds(filters);
      let data = this.getData(ids, filters);
      this.setDataState(data);
    }
  }

  setFiltersOnLoad(filters) {
    let filterState = {}
    _.forEach( filters.active, (filterName) => {
      let idx = _.findIndex(filters.data, 'name', filterName );
      filterState = _.assign(filterState,{[filterName]: [filters.data[idx].value, filters.data[idx].not] });
    });
    let ids = this.getFilteredIds(filterState);

    return this.getData(ids, filterState);
  }

  getFilteredIds(filters) {
    let ids = [];

    _.forEach( _.keys(filters), (filterName, idx) => {
      let options = _.map(this.props.initialData, row => row[filterName]);
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
  }

  getData(ids, filters) {
    if(ids.length > 1){
      let outputIds = [];
      for(let i = 0; i < ids.length - 1; i++) {
        let start = (outputIds.length > 0) ? outputIds : ids[i];
        outputIds = _.intersection(start,ids[i+1]);
      }
      ids = outputIds;
    } else {
      ids = (ids.length > 0) ? ids[0] : _.map(_.keys(this.props.initialData), id => parseInt(id));
    }
    let output = _.map(ids, id => this.props.initialData[id]);

    return { output: output, filters: filters }
  }

  setDataState(data) {
    this.setState({
      data: data.output,
      filters: data.filters
    });
  }

  render() {
    return (this.props.filters) ?
      <Details  widths={this.props.filters.widths || {lg: ['auto', '320px']}}
                rowStyle={this.props.filters.rowStyle || { float: 'left' }}
                cStyles={this.props.filters.cStyles || {lg: [{textAlign: 'left'}]}}
                cStyle={this.props.filters.cStyle || {float: 'left'}}
                cPadding={this.props.filters.cPadding || '0 20px 30px 0'}
                data={
                  _.map(this.props.filters.data, (filter, i) => {
                    if(filter.filterType === 'muiTextField') {
                      return { label: '' , value:

                        <TextField  floatingLabelText={filter.label}
                                    onChange={this.setFiltersOnChange(filter)} />

                      , detailType: 'muiTextField', labelStyle: { padding: '0' } }
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
                      return { label: filter.label, value:

                        <RaisedButton label={filter.button.label}
                                      href={filter.button.href}
                                      primary={(filter.button.primary) ? true : false }
                                      linkButton={(filter.button.linkButton) ? true : false } />

                      , detaildetailType: 'muiButton', rowStyle:  {marginTop: '30px'}}
                    } else if (filter.filterType === 'muiCheckBox') {
                      return { label: '' , value:

                        <Checkbox defaultChecked={filter.defaultChecked}
                                  onCheck={this.setFiltersOnChange(filter)}
                                  value={filter.value}
                                  style={_.assign({}, filter.style)}
                                  label={filter.label}/>

                        , detailType: 'muiCheckBox', rowStyle: {marginTop: '40px'} }
                    }
                  })
                }
      /> : '';
  }
}
