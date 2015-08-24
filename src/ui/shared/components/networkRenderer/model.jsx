import React from 'react'

import { modelQuery } from './queryBuilders'
import multiQueryRenderer from './queryRenderer'

export function networkModelRenderer(Component, tableName, options = {}) {

  return multiQueryRenderer(Component, {
    methods: options.methods || [],
    queries: [
      modelQuery(tableName, tableName, 'id')
    ]
  });
}
