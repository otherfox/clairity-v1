import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

export function getOpportunity(id) {
  return new Promise((s, f) => {
    req.get(`http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.SalesOppDAO&_m=getSalesOppById&id=${id}`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      })
  });
}


export function getOpportunitiesByAccount(id) {
  return new Promise((s, f) => {
    req.get(`http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.SalesOppDAO&_m=getAllSalesOppsByCustomerId&customer_id=${id}`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      })
  });
}
