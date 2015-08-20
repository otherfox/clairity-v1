import _ from 'lodash'

function consumeArguments() {
  let args = Array.from(arguments[0]);
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
  return {
    type: 'query',
    name: 'model',
    getParams(props) {
      return {
        table,
        id: props[options.idPropName]
      };
    }
  }
}

export function collection() {
  let { table, options } = consumeArguments(arguments);
  return {
    all() {
      return {
        type: 'query',
        name: 'collection',
        getParams(props) {
          return { table };
        }
      }
    },
    by() {
      let argInfo = consumeArguments(arguments);
      return {
        type: 'query',
        name: 'collectionVia',
        getParams(props) {
          return {
            table,
            filterTable: argInfo.table,
            filterId: props[argInfo.idPropName]
          };
        }
      }
    }
  }
}

export function query(name, getParams = (a => a)) {
  return {
    name, getParams,
    type: 'query',
  }
}

export function action() {
  let args = Array.from(arguments);
  let argName = args[0];
  let fn = (params, name) => ({
    params,
    name: argName || name,
    type: 'action'
  });
}
