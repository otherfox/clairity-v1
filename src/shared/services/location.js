import _ from 'lodash'
import moment from 'moment'

import req from 'superagent'

export function getLocation(id) {
  return new Promise((s, f) => {
    req.get("http://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.LocationDAO&_m=getLocationById&id="+id)
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
}

export function putLocation(location, sameAsCustomer = false) {
  return new Promise((s, f) => {
    let payload = {};

    if(sameAsCustomer) {
      payload.sameAsCustomer = true;
    }
    payload.location_id = location.id;
    payload.locationName = location.name || "";
    payload.customer_id = location.customer.id;
    payload.customerName = location.customer.name || "";
    payload.customerTypeId = location.customer.type.id;
    payload.customerStreet1 = location.customer.street1 || "";
    payload.customerStreet2 = location.customer.street2 || "";
    payload.customerCity = location.customer.city || "";
    payload.customerState = location.customer.state || "";
    payload.customerZip = location.customer.zip_code || "";
    payload.customer_tax_exempt = location.customer.tax_exempt == 1;
    payload.summary_billing = location.customer.summary_billing == 1;
    payload.show_international = location.customer.show_international == 1;
    payload.show_long_distance = location.customer.show_long_distance == 1;
    payload.email_invoice = location.customer.email_invoice == 1;
    payload.invoice_weekly = location.customer.invoice_weekly == 1;
    payload.customerAttn = location.customer.attn || "";
    payload.reference_number = location.customer.reference_number || "";
    payload.customerLegacyAccountNumber = location.customer.legacy_account_number || "";
    payload.vip = location.customer.vip == 1;
    payload.auto_pay = location.customer.auto_pay == 1;
    payload.order_index = location.order_index || "";
    payload.tax_exempt = location.tax_exempt == 1;
    payload.street1 = location.street1 || "";
    payload.street2 = location.street2 || "";
    payload.city = location.city || "";
    payload.zip_code = location.zip_code || "";
    payload.state = location.state || "";
    payload.location_reference_number = location.reference_number || "";
    payload.legacy_account_number = location.legacy_account_number || "";

    req.post('http://lab.rairity.com/controller.cfm?event=updateCustomerLocation')
      .withCredentials()
      .type('form')
      .send(payload)
      .end((err, res) => {
        if(!err) {
          s(res);
        } else {
          f(err);
        }
      });
  });
}
