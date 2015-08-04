import React from 'react'
import Filter from './filter'
import _ from 'lodash'

class Filters extends React.Component {
  style() {
    return {
      filter: {
        float: 'left',
        maxWidth: '360px',
        width: 'initial',
        marginRight: '30px'
      }
    }
  }
  handleOnChange(state) {
    console.log(state)
  }

  // setFiltersOnChange(filter) {
  //   return event => {
  //     let opp = (filter.not) ? true : false;
  //     let value = ((event.target.type === 'checkbox' && !event.target.checked) || event.target.value === '') ? '' : [event.target.value, opp];
  //     let filters = _.omit(_.assign(this.state.filters,{[filter.name]: value }), _.isEmpty);
  //     let ids = this.getFilteredIds(filters);
  //     let data = this.getData(ids, filters);
  //     this.setDataState(data);
  //   }
  // }
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
  // getFilteredIds(filters) {
  //   let ids = [];
  //
  //   _.forEach( _.keys(filters), (filterName, idx) => {
  //     let options = _.map(this.props.initialData, row => row[filterName]);
  //     let index = _.findIndex(this.props.filters.data, function(filter) { return filter.name == filterName; });
  //     ids[idx] = (this.props.filters.data[index].fuzzy === false ) ?
  //       _.filter(
  //         _.map(options, (row, idx) => {
  //           let filterValue = (isNaN(filters[filterName][0])) ? filters[filterName][0] : +filters[filterName][0];
  //           let compare = (isNaN(filterValue)) ? _.contains(row, filterValue) : _.isEqual(row, filterValue);
  //           compare = (filters[filterName][1]) ? !compare : compare;
  //           return (compare) ? idx : '';
  //         }),
  //       row => _.isNumber(row))
  //       : fuzzy.filter(filters[filterName][0], options).map( res => res.index);
  //   });
  //   return ids;
  // }
  //
  // getData(ids, filters) {
  //   if(ids.length > 1){
  //     let outputIds = [];
  //     for(let i = 0; i < ids.length - 1; i++) {
  //       let start = (outputIds.length > 0) ? outputIds : ids[i];
  //       outputIds = _.intersection(start,ids[i+1]);
  //     }
  //     ids = outputIds;
  //   } else {
  //     ids = (ids.length > 0) ? ids[0] : _.map(_.keys(this.props.initialData), id => parseInt(id));
  //   }
  //   let output = _.map(ids, id => this.props.initialData[id]);
  //
  //   return { output: output, filters: filters }
  // }


  render() {
    let children = React.Children.map(this.props.children, (child, idx) =>
      React.addons.cloneWithProps(child, {
        style: _.assign(this.style().filter, child.props.style),
        onChange: state => this.handleOnChange(state)
      }));
    return (
      <div>{children}</div>
    )
  }
}

export default Filters;
