
const urlBase = 'https://lab.rairity.com/controller.cfm?event='
// serialize&authkey=tardis&_c=ample.dao.CustomerDAO&_m=getCustomerById&id=${id}'

export function serialize(daoName, methodName, params, opts) {
  return [`${urlBase}serialize&authkey=tardis&_c=ample.dao.${daoName}&_m=${methodName}&` +
      Object.keys(params).map(k => `${k}=${params[k]}`).join('&'),
      Object.assign({ credentials: 'include' }, opts)];
}

export const post = { method: 'post' };
