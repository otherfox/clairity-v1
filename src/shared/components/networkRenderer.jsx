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

    componentWillMount() {
      //Store.on('update', this.update);
      let currentData = queryStore(tableName, this.props.id);
      this.setState({
        data: currentData,
        pending: true,
        ready: currentData ? true : false
      });
      getResource(this.props.id, tableName).then(data => {
        this.setState({
          pending: false,
          ready: true,
          data: fromJS(data)
        });
        Store.handleMessage({
          type: Store.MessageTypes.Write,
          payload: {
            table: tableName,
            row: data
          }
        });
      });
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
