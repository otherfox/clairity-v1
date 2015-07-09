// TODO: Memoize network traffic.
// TODO: Integrate network traffic w/ actions implicitly.

import _ from 'lodash'
import moment from 'moment'

import {debug} from '../mixins/debug'

import req from 'superagent'

export function getContact(id) {
  return new Promise((s, f) => {
    req.get(`http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.ContactDAO&_m=getContactById&id=${id}`)
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

export function getContactsWithoutOpportunities() {
  return new Promise(function(resolve, reject) {
    req.get(`http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.ContactDAO&_m=getAllContactsWithoutOpportunities`)
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

debug('getLeads')(getContactsWithoutOpportunities);
