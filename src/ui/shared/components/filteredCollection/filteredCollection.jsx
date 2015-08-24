import React, {Component, PropTypes, addons} from 'react/addons'
import { Filters } from '../filteredCollection'

class FilteredCollection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: this.refs.filters.filterData(props.data)
    });
  }

  componentDidMount() {
    this.updateFilters();
  }

  updateFilters() {
    let filters = this.refs.filters;
    let newData = filters.filterData(this.props.data);
    this.setState({
      data: newData
    });
  }

  render() {
    if (React.Children.count(this.props.children) != 2) {
      throw new Error('Filtered Collection must be given exactly two children');
    }
    let FiltersChild = null;
    let CollectionChild = null;

    React.Children.forEach(this.props.children, child => {
      if (child.type == Filters) {
        if (FiltersChild == null) {
          FiltersChild = addons.cloneWithProps(child, { ref: 'filters', onChange: () => this.updateFilters() });
        } else {
          throw new Error('Only one Filters component can be given to a FilteredCollection');
        }
      } else {
        if (CollectionChild == null) {
          CollectionChild = addons.cloneWithProps(child, { data: this.state.data });
        } else {
          throw new Error('Only one collection component can be given to a FilteredCollection');
        }
      }
    });
    return (
      <div>
        {FiltersChild}
        {this.state.data ? CollectionChild : false}
      </div>
    );
  }
}

FilteredCollection.propTypes = {
  data: PropTypes.array.isRequired
};

export default FilteredCollection;
