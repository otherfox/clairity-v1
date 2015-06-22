import data from './stubs/auth'
import _ from 'lodash'

import req from 'superagent'

export function tryUserLogin(creds) {
  return new Promise((resolve, reject) => {
    req.post("http://lab.rairity.com/login.cfm")
      .withCredentials()
      .type('form')
      .send(creds)
      .end((err, res) => {
        console.log(err);
        console.log(res);
      });
  });
  // return new Promise((res, rej) =>
  //   _.defer(() =>
  //     Math.random() > 0.5 ?
  //       res(data.user) :
  //       rej(data.reason)
  //   )
  // );
}
