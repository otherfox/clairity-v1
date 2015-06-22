
import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

/* Customer */

export function getAllCustomerTypes() {
  return new Promise((s, f) => {
    req.get("http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.CustomerDAO&_m=getAllCustomerTypes")
      .withCredentials()
      .end((err, res) => {
        if(!err) {
          s(JSON.parse(res.text));
        } else{
          f(err);
        }
      });
  });
}

/* Locations */
