import React from 'react'

import { collectionQuery, collectionViaQuery } from './queryBuilders'
import multiQueryRenderer from './queryRenderer'

export function networkCollectionRenderer(Component, options) {

  return multiQueryRenderer(Component, {
    methods: options.methods || [],
    queries: [
      collectionQuery(options.tableName, options.propName, options.replace)
    ]
  });

}
// export function networkCollectionRendererByProp(Component, options = {}) {
//
//   return multiQueryRenderer(Component, {
//     methods: options.methods || [],
//     queries: [
//       collectionViaQuery(options)
//     ]
//   });
// }
