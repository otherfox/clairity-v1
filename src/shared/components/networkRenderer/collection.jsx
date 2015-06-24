import React from 'react'
import delayRender from './base'
import Store, {MessageTypes} from '../../store'
import {fromJS} from 'immutable'

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
    cacheMethod: () => Store.data.get(options.tableName).toList(),
    serviceMethod: options.serviceMethod,
    propName: options.propName || options.tableName + 's'
  });

  return class networkCollectionRenderer extends React.Component {
    render() {
      return <Wrapped id={this.props.id} options={opts} />
    }
  }
}
