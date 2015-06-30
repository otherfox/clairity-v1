import _ from 'lodash'

import {queryLocation} from '../queries/location'

function setDefaultStrings(object, defs, fields) {
  for (let n in fields) {
    object[fields[n]] = defs[fields[n]] || '';
  }
}

export function eventUpdateWorkOrder(workOrder) {
  let o = _.cloneDeep(workOrder);
  let l = queryLocation(workOrder.location_id).toJS();
  if (l == null) {
    throw new Error("Cannot update work order without corresponding location object");
  }
  delete o.type;
  delete o.status;
  delete o.owner;
  delete o.services;
  if (workOrder.owner) {
    o.owner_id = workOrder.owner.id;
  } else {
    o.owner_id = '';
  }
  o.service_types = workOrder.services;
  setDefaultStrings(o, workOrder, [ 'technicalContactName', 'voiceContactName', 'siteContactName',
  'owner_id', 'description', 'ips_requested', 'customer_ip_block', 'subnet_mask',
  'first_usable_ip', 'last_usable_ip', 'gateway', 'ips_requested_2', 'customer_ip_block_2',
  'subnet_mask_2', 'first_usable_ip_2', 'last_usable_ip_2', 'gateway_2', 'customer_advertised_prefixes',
  'arin_org_id', 'bgp_as_number', 'dns_1', 'dns_2', 'loop_ip', 'master_radio_ip',
  'slave_radio_ip', 'vlan_id', 'router_ports', 'voice_handoff_type', 'pop_router_inventory_type_id',
  'radios_inventory_type_id', 'voice_cpe_inventory_type_id', 'other_inventory_type_id',
  'master_radio_mac', 'slave_radio_mac', 'frequency', 'master_radio_mac', 'transeiver_serial_number',
  'bts_serial_number', 'rssi', 'notes', 'expected_install_date', 'expected_install_date_end',
  'work_order_date', 'networking_notes', 'hardware_notes', 'general_notes',
  'provisioning_notes', 'att_circuit_id', 'att_order_number', 'message']);
  o.customer_id = l.customer.id;
  o.work_order_type_id = workOrder.type.id;
  o.work_order_status_id = workOrder.status.id;
  o.pop_entry = workOrder.pop_entry || workOrder.pop_id ? 'existing' : 'unknown';
  return o;
}
