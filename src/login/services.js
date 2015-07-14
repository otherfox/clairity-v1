import data from './stubs/auth'
import _ from 'lodash'

import req from 'superagent'

export function tryUserLogin(creds) {
  return new Promise((s, f) => {
    req.post("http://lab.rairity.com/login.cfm")
      .withCredentials()
      .type('form')
      .send(creds)
      .end((err, res) => {
        if (res.ok && res.xhr.responseURL.match(/controller\.cfm/i)) {
          s(res);
        } else {
          f({res, err});
        }
      });
  });
}
