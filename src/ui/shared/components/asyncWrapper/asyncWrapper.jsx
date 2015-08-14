
import {instance} from '../../../core/bridge'
import _ from 'lodash'

export default function asyncWrapper() {

  const args = Array.from(arguments);

  if (args.length === 1) {
    return Component => queryWrapper(Component, args);
  }

  const Component = args[0];
  const options = args[1];

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
