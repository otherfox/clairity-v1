import _ from 'lodash'
import moment from 'moment'

import {debug} from '../mixins/debug'

import req from 'superagent'

export function getTicket(id) {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.TicketDAO&_m=getTicketById&ticket_id=${id}`)
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

// TODO: Added param getActive to true. Need to add more services etc.

export function getTickets() {
  console.log('service tickets')
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.TicketDAO&_m=getAllTicketHeaders&getActive=true`)
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
