import React from 'react'

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
