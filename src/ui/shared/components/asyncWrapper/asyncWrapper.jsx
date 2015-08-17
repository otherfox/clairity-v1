
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
                   .filter(p => p[1].type === 'action')
                   .reduce((s, p) => s[p[0]] = p[1], {});

  const queries = _.chain(options)
                   .pairs()
                   .filter(p => p[1].type === 'query')
                   .reduce((s, p) => s[p[0]] = p[1], {});

  class AsyncWrapper extends React.Component {

    constructor(props) {
      super(props);

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
