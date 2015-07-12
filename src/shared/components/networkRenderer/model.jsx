import React from 'react'
import delayRender from './base'
import Store, {MessageTypes} from '../../store'
import {getResource} from '../../services/getResource'
import {fromJS} from 'immutable'
import {exposeMethods} from './methods'

import {modelQuery} from './queryBuilders'
import multiQueryRenderer from './queryRenderer'

export function networkModelRenderer(Component, tableName, options = {}) {

  return multiQueryRenderer(Component, {
    methods: options.methods || [],
    queries: [
      modelQuery(tableName, tableName, 'id')
    ]
  });
}
