import _ from 'lodash'

function consumeArguments() {
  let args = Array.from(arguments[0]);
  let options;
  let table;
  if (_.isString(args[0])) {
    if (args.length == 2 && _.isObject(args[1])) {
      options = Object.assign({}, args[1], {
        idPropName: args[1].idPropName || `${args[0]}Id`,
        filterKey: args[1].filterKey || `${args[0]}_id`
      });
      if (args[0] === 'account') {  // HACK: I don't really like this being here
        options.filterKey = args[1].filterKey || 'customer_id';
      }
    } else {
      options = {
        idPropName: `${args[0]}Id`,
        filterKey: `${args[0]}_id`
      };
      if (args[0] === 'account') { // HACK: Bad here too.
        options.filterKey = 'customer_id';
      }
    }
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
  let args = arguments;
  return {
    type: 'query',
    name: 'model',
    getParams(props, name) {
      let { table, options } = consumeArguments(args.length > 0 ? args : [name]);
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
            filterId: props[argInfo.options.idPropName],
            filterKey: argInfo.options.filterKey
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
  fn.type = 'action';
  return fn;
}
