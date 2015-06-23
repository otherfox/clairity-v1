import React from 'react'
import Store, {MessageTypes} from '../store'
import {getResource} from '../services/getResource'

import {fromJS} from 'immutable'

function queryStore(tableName, id) {
  return Store.data.getIn([tableName, id]) || null;
}

export function networkCollectionRenderer(Component, options) {

  let Wrapped = networkRenderer(Component, options.tableName);

  let opts = {
    cacheMethod: options.cacheMethod,
    serviceMethod: options.serviceMethod,
    writeMethod: data => Store.handleMessage({
      type: options.replace ? MessageTypes.ReplaceAll : MessageTypes.Write,
      payload: {
        rows: data,
        table: options.tableName
      }
    })
  };

  return class networkCollectionRenderer extends React.Component {
    render() {
      return <Wrapped id={this.props.id} options={opts} />
    }
  }
}

export default function networkRenderer(Component, tableName) {

  return class NetworkWrapperComponent extends React.Component {

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
      let currentData = this.queryCache(tableName, this.props.id, this.props.options);
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
      let currentData = this.queryCache(tableName, id, opts);
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
