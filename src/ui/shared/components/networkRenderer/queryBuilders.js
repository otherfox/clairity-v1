import React from 'react'
import Store, {MessageTypes} from '../../store'
import {getResource, getCollection, getCollectionVia} from '../../services/getResource'
import {fromJS} from 'immutable'

export function modelQuery(tableName, propName, idName) {
  let id = idName || `${tableName}Id`;
  return {
    tableName,
    propName: propName || tableName,
    cacheMethod: props => {
      let result = Store.data.getIn([tableName, props[id]]);
      return result ? result.toJS() : null;
    },
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
      return results.size > 0 ? results.toJS() : null;
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

export function collectionViaQuery(options) {
  let { table, viaTable, propName, idName, keyName } = options;
  let id = idName || `${table}Id`;
  return {
    tableName: table,
    propName: propName || table + 's',
    serviceMethod: props => getCollectionVia(table, viaTable, props[idName]),
    cacheMethod: props => {
      let results = Store.data.get(table)
        .toList()
        .filter(r => r.get(keyName) == props[idName]);
      return results.size > 0 ? results.toJS() : null;
    },
    writeMethod: rows => Store.handleMessage({
      type: MessageTypes.Write,
      payload: { rows, table }
    })
  }
}
