import React from 'react'
import Store from '../store'
import {getResource} from '../services/getResource'

import {fromJS} from 'immutable'

function queryStore(tableName, id) {
  return Store.data.getIn([tableName, id]) || null;
}

export default function(Component, tableName) {

  return class NetworkWrappedComponent extends React.Component {

    constructor() {
      super();
      this.state = {
        data: null,
        pending: true,
        ready: false,
      };
      this.update = this.update.bind(this);
    }

    update() {
      let currentData = queryStore(tableName, this.props.id);
      this.setState({
        data: currentData,
        ready: currentData ? true : false
      });
    }

    queryCache(id, tableName, options) {
      if (options && options.cacheMethod) {
        return options.cacheMethod(options);
      } else {
        return queryStore(tableName, id);
      }
    }

    queryService(id, tableName, options) {
      if (options && options.serviceMethod) {
        return options.serviceMethod(options, id, tableName);
      } else {
        return getResource(id, tableName);
      }
    }

    handleQueryResults(options) {
      return data => {
        this.setState({
          pending: false,
          ready: true,
          data: fromJS(data)
        });
        if (options && options.writeMethod) {
          options.writeMethod(data, tableName);
        } else {
          Store.handleMessage({
            type: Store.MessageTypes.Write,
            payload: {
              table: tableName,
              row: data
            }
          });
        }
      }
    }

    fetchData(id, opts) {
      let currentData = queryStore(tableName, id);
      this.setState({
        data: currentData,
        pending: true,
        ready: currentData ? true : false
      });
      this.queryService(id, tableName, opts)
        .then(this.handleQueryResults(opts));
    }

    componentWillMount() {
      //Store.on('update', this.update);
      this.fetchData(this.props.id);
    }

    componentWillReceiveProps(props) {
      if (this.state.data && this.state.data.get('id') != props.id) {
        this.fetchData(props.id, props.options);
      }
    }

    render() {
      if (this.state.ready) {
        return <Component {...this.props} {...{[tableName]: this.state.data}} />
      } else {
        return false;
      }
    }
  }

}
