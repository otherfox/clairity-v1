import React from 'react'
import delayRender from './base'
import Store, {MessageTypes} from '../../store'
import {getResource} from '../../services/getResource'
import {fromJS} from 'immutable'
import {exposeMethods} from './methods'

export function networkModelRenderer(Component, tableName, options) {

  let Delayed = delayRender(Component, {
    tableName,
    cacheMethod: props => Store.data.getIn([tableName, props.id]),
    serviceMethod: props => getResource(props.id, tableName),
    propName: tableName,
    shouldFetch: (e, p) => e.state.data && e.state.data.get('id') != p.id,
    methods: options ? options.methods : [],
    writeMethod: data => Store.handleMessage({
      type: MessageTypes.Write,
      payload: {
        table: tableName,
        row: data
      }
    })
  })

  @exposeMethods(options ? options.methods || [] : [])
  class NetworkModelWrapper extends React.Component {

    render() {
      return <Delayed {...this.props} />
    }

  }

  return NetworkModelWrapper;

}
