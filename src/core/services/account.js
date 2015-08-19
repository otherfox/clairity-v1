import _ from 'lodash'
import req from 'superagent'
import moment from 'moment'
import { withDelay } from 'memoize-promise'

const memoize = withDelay(10000); // ten second delay

let getAccount = memoize(id => {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.CustomerDAO&_m=getCustomerById&id=${id}`)
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

let getAccounts = memoize(() => {
  console.log('getting all accounts');
  debugger;
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.CustomerDAO&_m=getAllCustomers`)
      .withCredentials()
      .end((err, res) => {
        debugger;
        console.log('server responded with all accounts', JSON.parse(res.text));
        if (!err) {
          s(JSON.parse(res.text));
        } else {
          f(err);
        }
      });
  });
});

let getAccountsByAgent = memoize(id => {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.CustomerDAO&_m=getAllCustomersByAgentId&agent_id=${id}`)
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

let getAccountsByContact = memoize(id => {
  return new Promise((s, f) => {
    req.get(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.CustomerDAO&_m=getCustomersByContactId&contact_id=${id}`)
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

let getAllAccountTypes = memoize(() => {
  return new Promise((s, f) => {
    req.get("https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.CustomerDAO&_m=getAllCustomerTypes")
      .withCredentials()
      .end((err, res) => {
        if(!err) {
          s(JSON.parse(res.text));
        } else{
          f(err);
        }
      });
  });
});

export { getAccount, getAccounts, getAccountsByAgent, getAccountsByContact, getAllAccountTypes };
