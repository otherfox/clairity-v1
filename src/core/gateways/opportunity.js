import _ from 'lodash'

export function eventUpdateSalesOpp(data) {
  let customer = data.props.account;
  let account = data.account;
  let opp = _.extend({}, data.props.opportunity, data.opps);
  let payload = {};
  payload.customer_id = customer.id;
  payload.opportunity_id = opp.id;
  payload.tax_exempt = customer.tax_exempt;
  payload.summary_billing = customer.summary_billing;
  payload.show_international = customer.show_international;
  payload.show_long_distance = customer.show_long_distance;
  payload.email_invoice = customer.email_invoice;
  payload.invoice_weekly = customer.invoice_weekly;
  payload.vip = customer.vip;
  payload.auto_pay = customer.auto_pay;
  payload.user_id = customer.user_id;
  payload.customerTypeId = account.customerTypeId;
  payload.customerName = account.name;
  payload.customerStreet1 = account.street1 || '';
  payload.customerStreet2 = account.street2 || '';
  payload.customerCity = account.city || '';
  payload.customerState = account.state || '';
  payload.customerZip = account.zip_code;
  payload.oppName = opp.name;
  payload.salesStageId = opp.stage;
  payload.salesProjectTypeId = opp.project_type;
  payload.salesLeadSrcId = opp.lead_source_id;
  payload.salesCampSrcId = opp.lead_source;
  payload.offer_made = opp.offer_made ? 1 : 0;
  payload.project_started = opp.project_started ? 1 : 0;
  payload.project_result = opp.project_result ? 1 : 0;
  payload.dt_offer_made = opp.dt_offer_made || '';
  payload.dt_project_start = opp.dt_project_start || '';
  payload.dt_closing = opp.dt_closing || '';
  payload.dt_project_end = opp.dt_project_end || '';
  payload.sales = opp.sales || '';
  payload.probability = opp.probability || '';
  return payload;
}
