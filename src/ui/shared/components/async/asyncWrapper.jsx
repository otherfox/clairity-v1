import React, { Component } from 'react'
import {instance} from '../../../../core/bridge'
import _ from 'lodash'

export default function asyncWrapper() {

  const args = Array.from(arguments);

  if (args.length === 1) {
    return Component => asyncWrapper(Component, args);
  }

  const Component = args[0];
  const options = args[1];

  const merge = (s, p) => (s[p[0]] = p[1]) && s;

  const actions = _.chain(options)
                   .pairs()  // convert to arrays to maintain key names
                   .filter(p => p[1].type === 'action')  // filter by action
                   .map(p => [p[0], a => instance.dispatch(p[1](a, p[0]))])  // convert function to promise
                   .reduce(merge, {});  // create action dictionary

  const queries = _.chain(options)
                   .pairs()
                   .filter(p => p[1].type === 'query')

  class AsyncWrapper extends Component {

    constructor(props) {
      super(props);
      this.state = { ready: false };
      this.requestState(props);
    }

    componentWillReceiveProps(props) {
      if (!_.eq(props, this.props)) {
        this.setState({ready: false});
        this.requestState(props);
      }
    }

    requestState(props) {
      let promises = [];
      this.reqs = queries.map(q => {  // q - [propName, queryInfo]
        let { type, name } = q[1];
        let params = q[1].getParams(props, q[0]);
        let promise = instance.dispatch({ type, name, params });
        promises.push(promise);
        promise.then(this.queryFinished(q[0]));
        return [q[0], promise];
      }).reduce(merge, {});
      Promise.all(promises).then(() => this.setState({ ready: true }));
    }

    queryFinished(name) {
      return query => this.reqs[name] = query;
    }

    getInnerProps() {
      return {
        actions,
        ...this.reqs
      }
    }

    render() {
      let innerComponent = this.state.ready ?
          <Component key="inner" ref="inner" {...this.props} {...this.getInnerProps()} />
        :
          <div key="null" />;
      return (
        <CSSTransitionGroup transitionName="fade">
          {innerComponent}
        </CSSTransitionGroup>
      );
    }

  }

  return AsyncWrapper;
}
