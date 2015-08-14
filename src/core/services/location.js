import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

import { withDelay } from 'memoize-promise'

const memoize = withDelay(10000); // ten second delay

let getLocation = memoize(id => {
  return new Promise((s, f) => {
    req.get("https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.LocationDAO&_m=getLocationById&id="+id)
      .withCredentials()
      .end((err, res) => {
        if(!err) {
          let location = JSON.parse(res.text);
          //convert text booleans into real booleans
          for(let key in location.customer) {
            switch(location.customer[key]) {
              case 'true':
                location.customer[key] = true;
                break;
              case 'false':
                location.customer[key] = false;
                break;
            }
          }
          s(location);
        } else {
          f(err);
        }
      });
  });
});

let getLocationsByPop = memoize(id => {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.LocationDAO&_m=getLocationsByPopId&pop_id=${id}`)
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

let getLocationsByContact = memoize(id => {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.LocationDAO&_m=getLocationsByContact&contact_id=${id}`)
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

let getLocationsByStatus = memoize(status => {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.LocationDAO&_m=getAllLocationsByStatus&status=${status}`)
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

export {
  getLocation, getLocationsByPop, getLocationsByContact, getLocationsByStatus,
  getLocationsByContact
};

import { eventUpdateCustomerLocation } from '../gateways/location'

export function putLocation(location, sameAsCustomer = false) {
  return new Promise((s, f) => {
    req.post('https://lab.rairity.com/controller.cfm?event=updateCustomerLocation')
      .withCredentials()
      .type('form')
      .send(eventUpdateCustomerLocation(location, sameAsCustomer))
      .end((err, res) => {
        if(!err) {
          s(res);
        } else {
          f(err);
        }
      });
  });
}
