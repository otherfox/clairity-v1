import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

export function getAgingReports(date = Date.now()) {
  return new Promise((s, f) => {
    req.get("http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.TransactionDAO&_m=getAging&as_of_date="+moment(date).format())
      .withCredentials()
      .end((err, res) => {
        if(!err){
          let resJSON = JSON.parse(res.text);
          let keys = _.map(resJSON.COLUMNS, function (key) {return key.toLowerCase()});
          let response = {}
          response.rows = _.map(resJSON.DATA, function (dataArray, index) {
            let data = _.object(keys, dataArray);
            data.balance = Math.round(data.balance*100)/100;
            data.b_0_30 = Math.round(data.b_0_30*100)/100;
            data.b_31_60 = Math.round(data.b_31_60*100)/100;
            data.b_61_90 = Math.round(data.b_61_90*100)/100;
            data.b_91 = Math.round(data.b_91*100)/100;
            return data;
          });
          console.log(response);
          s(response);
        } else {
          f(err);
        }
      });
  });
}
