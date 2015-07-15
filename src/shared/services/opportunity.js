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

import {eventUpdateSalesOpp} from '../gateways/opportunity'

export function putOpportunity(opp) {
  return new Promise((s, f) => {
    patchRequest();
    req.post(`http://lab.rairity.com/controller.cfm?event=updateSalesOpp`)
      .withCredentials()
      .type('form')
      .send(eventUpdateSalesOpp(opp))
      .end((err, res) => {
        if (res.ok && res.xhr.responseURL.match(/controller\.cfm/i)) {
          return s(res);
        } else {
          f(err);
        }
      })
    unpatchRequest();
  });
}

let _s = req.prototype.serialize;

function patchRequest() {
  req.prototype.serialize = function (obj) {
    if (!isObject(obj)) return obj;
    var pairs = [];
    for (var key in obj) {
      if (null != obj[key]) {
        pairs.push(encodeURIComponent(key).replace('%20', '+')
          + '=' + encodeURIComponent(obj[key]).replace('%20', '+'));
      }
    }
    return pairs.join('&');
  };
}

function unpatchRequest() {
  req.prototype.serialize = _s;
}
