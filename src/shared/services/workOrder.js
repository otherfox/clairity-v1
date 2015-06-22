// import data from './stubs/orders'
import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

export function getWorkOrder(id) {
  return new Promise((s, f) => {
    req.get(`http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.WorkOrderDAO&_m=getWorkOrderById&id=${id}`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      });
  });
}

export function getWorkOrderMessages(id) {
  return new Promise((s, f) => {
    req.get(`http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.WorkOrderMessageDAO&_m=getAllWorkOrderMessagesByWorkOrderId&work_order_id=${id}`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      });
  });
}

export function getWorkOrderTypes() {
  return new Promise((s, f) => {
    req.get(`http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.WorkOrderTypeDAO&_m=getAllWorkOrderTypes`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      });
  });
}

export function getWorkOrderStatuses() {
  return new Promise((s, f) => {
    req.get(`http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.WorkOrderStatusDAO&_m=getAllWorkOrderStatuses`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      });
  });
}

export function putWorkOrder(id, data) {
    return new Promise((s, f) => {

    });
}
