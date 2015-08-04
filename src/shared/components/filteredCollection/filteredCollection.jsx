import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import {Filters, Filter} from '../filteredCollection'
import fuzzy from 'fuzzy'
import controllable from 'react-controllables'

@controllable(['data', 'filters'])

class FilteredCollectionView extends Component {

  onChange(filter) {
    this.props.handleOnChange(filter)
  }

  render() {
    let children = React.Children.map(this.props.children, (child, idx) => React.addons.cloneWithProps(child, {data: this.props.data, handleOnChange: filter => this.onChange(filter) }));
    return (
      <div>{children}</div>
    )
  }
}

class FilteredCollection extends Component {
  handleOnChange(filter) {
    this.setFiltersOnChange(filter);
  }

  setFiltersOnChange(filter) {
    let opp = (filter.opp) ? true : false;
    filter.value = (filter.value === true) ? filter.filterValue : filter.value;
    filter.value = (filter.value === false) ? '' : filter.value;

    let value = (filter.value === '') ? '' : [filter.value, opp];

    // ToDo name not allowed in strict mode. Do this better
    let name = (filter.name === 'name') ? 'name_strict' : filter.name;

    let filters = _.omit(_.assign(this.props.filters,{[name]: value }), _.isEmpty);
    let ids = this.getFilteredIds(filters);

    let data = this.getData(ids, filters);

    this.props.data = data.data;
    this.props.filters = data.filters;
  }

  getFilteredIds(filters) {

    let ids = [];

    _.forEach( _.keys(filters), (filterName, idx) => {
      // for 'name' in strict
      let rowFilterName = (filterName === 'name_strict') ? 'name' : filterName;
      // Get Options for filtering
      let options = _.map(this.props.initialData, row => row[rowFilterName]);
      // Todo Better way? Trying to get props way down tree
      // Get Filters id
      let filtersIdx = _.findIndex(this.props.children, (child, childIdx) => child.type === Filters);
      // Get Filter id
      let filterIdx = _.findIndex(this.props.children[filtersIdx].props.children, (child, childIdx) => child.props.name === rowFilterName);
      // isFuzzy
      let isFuzzy = this.props.children[filtersIdx].props.children[filterIdx].props.fuzzy;

      ids[idx] = (isFuzzy === false) ?
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

    return { data: output, filters: filters }
  }

  render() {
    return (
      <FilteredCollectionView {..._.assign(this.props, { handleOnChange: filter => this.handleOnChange(filter), defaultData: this.props.data, initialData: this.props.data, defaultFilters: this.props.filters })} />
    )
  }
}

FilteredCollection.defaultProps = { filters: PropTypes.object }

//
// setFiltersOnLoad(filters) {
//   let filterState = {}
//   _.forEach( filters.active, (filterName) => {
//     let idx = _.findIndex(filters.data, 'name', filterName );
//     filterState = _.assign(filterState,{[filterName]: [filters.data[idx].value, filters.data[idx].not] });
//   });
//   let ids = this.getFilteredIds(filterState);
//
//   return this.getData(ids, filterState);
// }
//


export default FilteredCollection;
