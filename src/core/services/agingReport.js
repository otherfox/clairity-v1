import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

export function agingReports(args = { date: Date.now() }) {
  let { date } = args;
  return getAgingReports(date);
}

export function getAgingReports(date = Date.now()) {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=agingReport&as_of_date=${moment(date).format('MM/DD/YYYY')}&json`)//"https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.TransactionDAO&_m=getAging&as_of_date="+moment(date).format())
      .withCredentials()
      .end((err, res) => {
        if(!err){
          let resJSON = JSON.parse(res.text);
          resJSON.rows = resJSON.rows.map(row => {
            row.balance = row.b;
            row.b_0_30 = row.b1;
            row.b_31_60 = row.b2;
            row.b_61_90 = row.b3;
            row.b_91 = row.b4;
            delete row.b;
            delete row.b1;
            delete row.b2;
            delete row.b3;
            delete row.b4;
            return row;
          });
          s(resJSON.rows);
        } else {
          f(err);
        }
      });
  });
}
