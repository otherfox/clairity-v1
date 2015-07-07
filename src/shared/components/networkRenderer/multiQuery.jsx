import React from 'react'
import Store, {MessageTypes} from '../../store'
import {getResource} from '../../services/getResource'
import {exposeMethods} from './methods'
import {fromJS} from 'immutable'
import _ from 'lodash'

import DelayState from './delayState'

export default function multiQueryRenderer(Component, options) {

  @exposeMethods(options.methods || [])
  class MultiQueryRenderer extends React.Component {

    constructor(props) {
      // TOOD: Autobind decorator
      super(props);
      this.update = this.update.bind(this);
      this.queries = options.queries.map(q =>
        new DelayState(props, q, this.update));
      this.state = {
        ready: this.ready
      };
    }

    get ready() {
      return this.queries.reduce((val, q) => val && q.ready, false);
    }

    componentDidMount() {
      this.queries.forEach(q => q.listen());
    }

    componentWillDismount() {
      this.queries.forEach(q => q.stop());
    }

    update() {
      this.setState({
        ready: this.ready,
        queryState: this.queries.map((s, q) => _.extend({}, s, q.state), {})
      });
    }

    render() {
      if (this.state.ready) {
        return <Component {...this.props} {...this.state.queryState} />;
      } else {
        return false;
      }
    }

  }

  return MultiQueryRenderer;
}
