import React from 'react'
import Store, {MessageTypes} from '../../store'
import {getResource} from '../../services/getResource'

import {fromJS} from 'immutable'

export default function delayRender(Component, options) {

  return class DelayedRenderer extends React.Component {

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
      let currentData = options.cacheMethod(this.props, options);
      this.setState({
        data: currentData,
        ready: currentData ? true : false
      });
    }

    handleQueryResults(options) {
      return data => {
        this.setState({
          pending: false,
          ready: true,
          data: fromJS(data)
        });
        options.writeMethod(data, options)
      }
    }

    fetchData(props, opts) {
      let currentData = options.cacheMethod(props, opts);
      this.setState({
        data: currentData,
        pending: true,
        ready: currentData ? true : false
      });
      options.serviceMethod(props, opts)
        .then(this.handleQueryResults(opts));
    }

    componentWillMount() {
      Store.on('update', this.update);
      this.fetchData(this.props.id);
    }

    componentWillReceiveProps(props) {
      if (options.shouldFetch(this, props)) {
        this.fetchData(props, options);
      }
    }

    render() {
      if (this.state.ready) {
        return <Component {...this.props} {...{[options.propName]: this.state.data}} />
      } else {
        return false;
      }
    }
  }

}
