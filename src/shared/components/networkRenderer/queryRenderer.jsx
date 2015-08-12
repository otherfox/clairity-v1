import React, {addons} from 'react/addons'
import Store, {MessageTypes} from '../../store'
import {getResource} from '../../services/getResource'
import {exposeMethods} from './methods'
import {fromJS} from 'immutable'
import _ from 'lodash'

let {CSSTransitionGroup} = addons;

import QueryState from './queryState'

export default function multiQueryRenderer(Component, options) {

  @exposeMethods(options.methods || [])
  class QueryRenderer extends React.Component {

    constructor(props) {
      // TOOD: Autobind decorator
      super(props);
      this.update = this.update.bind(this);
      this.queries = options.queries.map(q =>
        new QueryState(props, q, this.update));
      this.state = {
        ready: this.ready()
      };
    }

    ready() {
      return this.queries.reduce((val, q) => val && q.ready, true);
    }

    componentDidMount() {
      this.queries.forEach(q => q.listen().fetch());
    }

    componentWillUnmount() {
      this.queries.forEach(q => q.stop());
    }

    componentWillReceiveProps(props) {
      this.queries.forEach(q => q.props = props);
      this.update();
    }

    update() {
      this.setState({
        ready: this.ready(),
        queryState: this.getQueryState()
      });
    }

    getQueryState() {
      return this.queries.reduce((s, q) => _.extend({}, s, q.state), {});
    }

    render() {
      let innerComponent = this.state.ready ?
          <Component key="inner" ref="inner" {...this.props} {...this.getQueryState()} />
        :
          <div key="null" />;
      return (
        <CSSTransitionGroup transitionName="fade">
          {innerComponent}
        </CSSTransitionGroup>
      );
    }

  }

  return QueryRenderer;
}
