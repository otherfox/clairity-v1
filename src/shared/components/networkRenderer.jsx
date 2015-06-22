import React from 'react'
import Store from '../store'
import {getResource} from '../services/getResource'

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
    }

    componentWillMount() {
      let currentData = queryStore(tableName, this.props.id);
      this.setState({
        data: currentData,
        pending: true,
        ready: currentData ? true : false
      });
      getResource(this.props.id, tableName).then(data => {
        Store.handleMessage({
          type: Store.MessageTypes.Write,
          payload: {
            table: tableName,
            row: data
          }
        });
        this.setState({
          pending: false,
          ready: true,
          data: data
        });
      });
    }

    render() {
      if (this.state.ready) {
        return <Component {...this.props} />
      } else {
        return false;
      }
    }
  }

}
