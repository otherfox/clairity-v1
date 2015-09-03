import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

export function getPurchaseRequests() {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.TicketDAO&_m=getAllPurchaseRequests`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          console.log('response:',res);
          s(JSON.parse(res.text));
        } else {
          console.log('error:',err);
          f(err);
        }
      });
  });
}
