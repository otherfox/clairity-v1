import React from 'react'
import delayRender from './base'
import Store, {MessageTypes} from '../../store'
import {getResource} from '../../services/getResource'
import {fromJS} from 'immutable'

export function modelQuery(tableName, propName, methods = []) {
  let id = `${tableName}Id`;
  return {
    tableName,
    methods,
    propName: propName || tableName,
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

export function collectionQuery(tableName, propName, methods = []) {
  return {
    tableName,
    methods,
    propName: options.propName || options.tableName + 's',
    serviceMethod: props => getCollection(tableName),
    cacheMethod: () => {
      let results = Store.data.get(tableName).toList();
      return results.size > 0 ? results : null;
    },
    writeMethod: data => Store.handleMessage({
      type: options.replace ? MessageTypes.ReplaceAll : MessageTypes.Write,
      payload: {
        rows: data,
        table: tableName
      }
    })
  }
}
