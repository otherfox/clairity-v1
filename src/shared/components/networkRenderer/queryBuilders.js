import React from 'react'
import Store, {MessageTypes} from '../../store'
import {getResource, getCollection} from '../../services/getResource'
import {fromJS} from 'immutable'

export function modelQuery(tableName, propName, idName) {
  let id = idName || `${tableName}Id`;
  return {
    tableName,
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

export function collectionQuery(tableName, propName, replace = true) {
  return {
    tableName,
    propName: propName || tableName + 's',
    serviceMethod: props => getCollection(tableName),
    cacheMethod: () => {
      let results = Store.data.get(tableName).toList();
      if (tableName == "user") debugger;
      return results.size > 0 ? results : null;
    },
    writeMethod: data => Store.handleMessage({
      type: replace ? MessageTypes.ReplaceAll : MessageTypes.Write,
      payload: {
        rows: data,
        table: tableName
      }
    })
  }
}
