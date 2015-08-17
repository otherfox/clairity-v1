import _ from 'lodash'

function consumeArguments() {
  let args = Array.from(arguments);
  if (args.length !== 1)
    throw new Error('Async query helpers only takes a single argument');
  let options;
  let table;
  if (_.isString(args[0])) {
    options = { idPropName: `${args[0]}Id` };
    table = args[0];
  } else if (_.isObject(args[0])) {
    table = args[0].table;
    args[0].idPropName || (args[0].idPropName = `${args[0].table}Id`);
    options = args[0];
  } else {
    throw new TypeError('Async query helpers only accepts a table name ' +
                        '(string) or options (object)');
  }
  return { table, options };
}

export function model() {
  let { table, options } = consumeArguments(arguments);
  return Object.assign(id => ({
    type: 'query',
    name: 'model',
    params: { id, table }
  }), options);
}

export function collection() {
  let { table, options } = consumeArguments(arguments);
  return {
    all() {
      return Object.assign(() => ({
        type: 'query',
        name: 'collection',
        params: { table }
      }), options);
    },
    by() {
      let argInfo = consumeArguments(arguments);
      return Object.assign(filterId => ({
        type: 'query',
        name: 'collectionVia',
        params: {
          table, filterId,
          filterTable: argInfo.table,
        }
      }), options, argInfo.options);
    }
  }
}

export function action() {
  let args = Array.from(arguments);
  let fn = name => params => ({
    name, params,
    type: 'action'
  });
  if (args.length === 0) {
    return fn;
  }
  return fn(args[0]);
}
