// import data from './stubs/orders'
import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

export function getWorkOrder(id) {
  return new Promise((s, f) => {
    req.get("http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.WorkOrderDAO&_m=getWorkOrderById&id="+id)
      .withCredentials()
      .end((err, res) => {
        if(!err){
          let order = JSON.parse(res.text);
          console.log('get work order: ', order);
          s(order);
        } else {
          f(err);
        }
      });
  });
  //return new Promise((res, rej) => _.defer(() => res(data)));
}

export function putWorkOrder(id, data) {
    return new Promise((s, f) => {

    });
}
