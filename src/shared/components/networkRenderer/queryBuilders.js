import React from 'react'
import delayRender from './base'
import Store, {MessageTypes} from '../../store'
import {getResource} from '../../services/getResource'
import {fromJS} from 'immutable'

export function modelQuery(tableName, options) {
  let id = `tableName${Id}`;
  return {
    tableName,
    propName: tableName,
    methods: options ? options.methods || [] : [],
    cacheMethod: props => Store.data.getIn([tableName, props[id]]),
    serviceMethod: props => getResource(props[id], tableName),
    writeMethod: data => Store.handleMessage({
      type: MessageTypes.Write,
      payload: {
        table: tableName,
        row: data
      }
    })
  }
}
