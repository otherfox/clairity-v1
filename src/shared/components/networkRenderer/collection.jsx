import React from 'react'
import delayRender from './base'
import Store, {MessageTypes} from '../../store'
import {fromJS} from 'immutable'
import {exposeMethods} from './methods'

export function networkCollectionRenderer(Component, options) {

  let Delayed = delayRender(Component, {
    writeMethod: data => Store.handleMessage({
      type: options.replace ? MessageTypes.ReplaceAll : MessageTypes.Write,
      payload: {
        rows: data,
        table: options.tableName
      }
    }),
    shouldFetch: e => e.state.data,
    cacheMethod: () => {
      let results = Store.data.get(options.tableName).toList();
      return results.size > 0 ? results : null;
    },
    methods: options.methods,
    serviceMethod: options.serviceMethod,
    propName: options.propName || options.tableName + 's'
  });

  @exposeMethods(options.methods || [])
  class NetworkCollectionRenderer extends React.Component {
    render() {
      return <Delayed ref="inner" {...this.props} />
    }
  }

  return NetworkCollectionRenderer;
}
