import _ from 'lodash'
import moment from 'moment'

import {debug} from '../mixins/debug'

import req from 'superagent'

export function getAccount(id) {
  return new Promise((s, f) => {
    req.get(`http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.CustomerDAO&_m=getCustomerById&id=${id}`)
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
