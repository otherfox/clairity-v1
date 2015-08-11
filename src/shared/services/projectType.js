import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

export function getProjectTypes() {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.SalesProjectTypeDAO&_m=getAllSalesProjectTypes`)
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
