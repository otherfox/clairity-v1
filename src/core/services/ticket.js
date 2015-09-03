import _ from 'lodash'
import moment from 'moment'

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

export function getTicketTemplates() {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.TicketTemplateDAO&_m=getAllTicketTemplates`)
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

export function getTicketStatuses() {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.TicketDAO&_m=getAllTicketStatuses`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          console.log('response:',res);
          let parsed = JSON.parse(res.text);
          let results = parsed.DATA.map(r => ({id: r[0], name: r[1]}));
          s(results);
        } else {
          console.log('error:',err);
          f(err);
        }
      });
  });
}

export function getTicketPriorities() {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.TicketDAO&_m=getAllTicketPriorities`)
      .withCredentials()
      .end((err, res) => {
        if (!err) {
          console.log('response:',res);
          let parsed = JSON.parse(res.text);
          let results = parsed.DATA.map(r => ({id: r[0], name: r[1], level: r[2]}));
          s(results);
        } else {
          console.log('error:',err);
          f(err);
        }
      });
  });
}
