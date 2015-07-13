import React from 'react'
import Store, {MessageTypes} from '../../store'
import {getResource} from '../../services/getResource'
import {exposeMethods} from './methods'
import {fromJS} from 'immutable'
import _ from 'lodash'

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
      this._dirty = false;
    }

    ready() {
      return this.queries.reduce((val, q) => val && q.ready, true);
    }

    shouldComponentUpdate(props, state) {
      return this._dirty || this.state.queryState != this.getQueryState();
    }

    componentDidMount() {
      this.queries.forEach(q => q.listen().fetch());
    }

    componentWillDismount() {
      this.queries.forEach(q => q.stop());
    }

    componentWillReceiveProps(props) {
      this.queries.forEach(q => q.props = props);
      this.update();
      this._dirty = true;
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
      if (this.state.ready) {
        return <Component {...this.props} {...this.getQueryState()} />;
      } else {
        return false;
      }
    }

  }

  return QueryRenderer;
}
