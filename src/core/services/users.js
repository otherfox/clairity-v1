import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

import { withDelay } from 'memoize-promise'

const memoize = withDelay(10000); // ten second delay

let getUser = memoize(id => {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.UserDAO&_m=getUserById&id=${id}`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      });
  });
});

let getPermissionByRole = memoize(role => {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.UserDAO&_m=getPermissionByRoleName&roleName=${id}`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      });
  });
});

let getUsersByRole = memoize((role, active = true) => {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.UserDAO&_m=getAllUsersByRoleName&roleName=${role}&active=${active}`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      });
  });
});

let getUsersByType = memoize((type, active = true) => {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.UserDAO&_m=getAllUsersByType&type=${type}&active=${active}`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      });
  });
});

let getWorkOrderOwners = memoize(() => {
  return Promise.all([getUsersByRole('provisioning'), getUsersByRole('field_ops')])
    .then(results => _.uniq(results[0].concat(results[1]), 'id'));
});

let getAccountOwners = memoize(() => {
  return getUsersByType('Employee');
});

export {
  getUser, getPermissionByRole, getUsersByRole, getUsersByType,
  getWorkOrderOwners, getAccountOwners
};
