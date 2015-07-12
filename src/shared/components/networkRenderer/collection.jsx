import React from 'react'
import delayRender from './base'
import Store, {MessageTypes} from '../../store'
import {fromJS} from 'immutable'
import {exposeMethods} from './methods'

import {collectionQuery} from './queryBuilders'
import multiQueryRenderer from './queryRenderer'

export function networkCollectionRenderer(Component, options) {

  return multiQueryRenderer(Component, {
    methods: options.methods || [],
    queries: [
      collectionQuery(options.tableName, options.propName)
    ]
  });
  
}
