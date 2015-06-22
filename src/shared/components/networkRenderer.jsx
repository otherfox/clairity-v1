import React from 'react'
import Store from '../store'

function queryStore(tableName, id) {
  return Store.data.getIn([tableName, id]) || null;
}

export default function(Component, tableName) {

  return class NetworkWrappedComponent extends React.Component {

    constructor() {
      super();
      let data = queryStore(tableName, this.props.id);
      this.state = {
        data: data,
        pending: true,
        ready: data ? true : false,
      };
    }

    componentWillMount() {
      // let promise = Component.queryForData(this.props.id);
      promise.then(() => {
        let data = queryStore(tableName, this.props.id);
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
