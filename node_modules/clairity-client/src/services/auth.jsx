import data from './stubs/auth'
import _ from 'lodash'

import req from 'superagent'

export function tryUserLogin(username, password) {
  // new Promise((resolve, reject) => {
  //   req.post("TODO: SCOTT HALP")
  //     .withCredentials()
  //     .send({username, password}) // ES6 has the same cool feature as coffeescript
  //     .end((err, res) => {
  //       console.log(err);
  //       console.log(res);
  //     });
  // });
  return new Promise((res, rej) =>
    _.defer(() =>
      Math.random() > 0.5 ?
        res(data.user) :
        rej(data.reason)
    )
  );
}
