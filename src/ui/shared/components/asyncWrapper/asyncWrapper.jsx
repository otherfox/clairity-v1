
import {instance} from '../../../core/bridge'
import _ from 'lodash'

export default function asyncWrapper() {

  const args = Array.from(arguments);

  if (args.length === 1) {
    return Component => queryWrapper(Component, args);
  }

  const Component = args[0];
  const options = args[1];

  const actions = _.chain(options)
                   .pairs()  // convert to arrays to maintain key names
                   .filter(p => p[1].type === 'action')  // filter by action
                   .map(p => [p[0], a => instance.dispatch(p[1](a, p[0]))])  // convert function to promise
                   .reduce((s, p) => (s[p[0]] = p[1]) && s, {});  // create action dictionary

  const queries = _.chain(options)
                   .pairs()
                   .filter(p => p[1].type === 'query')
                   //.reduce((s, p) => (s[p[0]] = p[1]) && s, {});

  class AsyncWrapper extends React.Component {

    constructor(props) {
      super(props);
      this.state = { ready: false };
      this.requestState();
    }

    requestState() {
      let promises = [];
      this.reqs = queries.map(q => {  // q - [propName, queryInfo]
        let { type, name } = q[1];
        let params = q[1].getParams(this.props, q[0]);
        let promise = instance.dispatch({ type, name, params });
        promises.push(promise);
        promise.then(this.queryFinished(q[0]));
        return [q[0], promise];
      }).reduce((s, p) => (s[p[0]] = p[1]) && s, {});
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

  return QueryRenderer;
}
