import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

export function getContract(id) {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.ContractDAO&_m=getContractById&id=${id}`)
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

export function getContractsByAccount(id) {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.ContractDAO&_m=getContractsByCustomerId&customer_id=${id}`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          let contracts = JSON.parse(res.text);
          contracts.forEach(c => c.customer_id = id);
          s(contracts);
        } else {
          f(err);
        }
      });
  });
}

export function getContractsByLocation(id) {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.ContractDAO&_m=getAllContractsByLocationId&location_id=${id}`)
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
