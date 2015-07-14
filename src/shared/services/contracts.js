import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

export function getContract(id) {
  return new Promise((s, f) => {
    req.get(`http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.ContractDAO&_m=getContractById&id=${id}`)
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
