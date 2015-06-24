import React from 'react'
import delayRender from './base'
import Store, {MessageTypes} from '../store'
import {getResource} from '../../services/getResource'
import {fromJS} from 'immutable'

export function networkModelRenderer(Component, tableName) {

  let Delayed = delayRender(Component, {
    tableName,
    cacheMethod: props => Store.data.getIn([tableName, props.id]),
    serviceMethod: props => getResource(props.id, tableName),
    propName: tableName,
    shouldFetch: (e, p) => e.state.data && e.state.data.get('id') != p.id,
    writeMethod: data => Store.handleMessage({
      type: MessageTypes.Write,
      payload: {
        table: tableName,
        row: data
      }
    })
  })

  return class NetworkModelWrapper extends React.Component {

    render() {
      return <Delayed {...this.props} />
    }

  }

}

if (this.state.data && this.state.data.get('id') != props.id) {
  this.fetchData(props, options);
}
