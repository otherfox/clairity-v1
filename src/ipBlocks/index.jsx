
import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import Details from  '../shared/components/details'
import DropDown from '../shared/components/dropDown'
import Table from  '../shared/components/table'
import Typeahead from '../shared/components/typeahead/typeahead'
import _ from 'lodash'

import {
  RadioButtonGroup,
  RadioButton,
  Checkbox,
  FlatButton,
  RaisedButton,
  FloatingActionButton,
  IconButton,
  Toggle,
  Slider,
  DropDownMenu,
  DatePicker,
  TextField,
  Paper
} from 'material-ui'

import controllable from 'react-controllables'
import {List} from 'immutable'

import {Navigation} from 'react-router'

let IpBlocks = React.createClass({
  mixins: [Navigation],
  propTypes: {
    blocks: React.PropTypes.object
  },
  getBlocks() {
    return [
      { blockId: 12005, block: '66.187.176.0/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'internal: Internal' },
      { blockId: 12006, block: '66.187.176.4/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Winder'},
      { blockId: 12007, block: '66.187.176.8/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12008, block: '66.187.176.9/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 2323 Bryan'},
      { blockId: 12009, block: '66.187.176.10/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12010, block: '66.187.176.11/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12011, block: '66.187.176.12/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12224, block: '66.187.176.12/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'internal: Internal'},
      { blockId: 12012, block: '66.187.176.13/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12013, block: '66.187.176.14/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12014, block: '66.187.176.15/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12225, block: '66.187.176.16/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 180 Peachtree'},
      { blockId: 12015, block: '66.187.176.20/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Perimeter Summit 1'},
      { blockId: 12016, block: '66.187.176.24/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 180 Peachtree'},
      { blockId: 12226, block: '66.187.176.28/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 300 Throckmorton'},
      { blockId: 12227, block: '66.187.176.32/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'internal: Internal'},
      { blockId: 12017, block: '66.187.176.36/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'internal: Internal'},
      { blockId: 12228, block: '66.187.176.40/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'internal: Internal'},
      { blockId: 12018, block: '66.187.176.44/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12019, block: '66.187.176.48/29', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12223, block: '66.187.176.52/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 180 Peachtree'},
      { blockId: 12020, block: '66.187.176.56/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12021, block: '66.187.176.60/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12022, block: '66.187.176.64/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12023, block: '66.187.176.80/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: iSigma'},
      { blockId: 12024, block: '66.187.176.96/29', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: VOIP'},
      { blockId: 12025, block: '66.187.176.172/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 55 Marietta'},
      { blockId: 12026, block: '66.187.176.184/29', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12027, block: '66.187.177.12/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12028, block: '66.187.177.16/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12029, block: '66.187.177.24/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12030, block: '66.187.177.48/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12031, block: '66.187.177.52/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12032, block: '66.187.177.56/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12033, block: '66.187.177.60/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12034, block: '66.187.177.64/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12035, block: '66.187.177.68/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12036, block: '66.187.177.72/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12037, block: '66.187.177.76/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12038, block: '66.187.177.80/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: VOIP'},
      { blockId: 12039, block: '66.187.177.92/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12040, block: '66.187.177.96/29', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Nexidia'},
      { blockId: 12041, block: '66.187.177.104/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12042, block: '66.187.177.108/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12043, block: '66.187.177.148/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12044, block: '66.187.177.152/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12045, block: '66.187.177.200/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12046, block: '66.187.177.208/28', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Promenade'},
      { blockId: 12047, block: '66.187.177.224/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12048, block: '66.187.177.228/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12049, block: '66.187.178.12/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12050, block: '66.187.178.16/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12051, block: '66.187.178.232/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12052, block: '66.187.178.236/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12053, block: '66.187.179.0/29', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12054, block: '66.187.179.8/29', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12055, block: '66.187.179.228/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12056, block: '66.187.179.248/29', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Winder'},
      { blockId: 12057, block: '66.187.180.24/29', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Dekalb Tower'},
      { blockId: 12058, block: '66.187.180.40/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Winder'},
      { blockId: 12059, block: '66.187.180.72/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Cobb'},
      { blockId: 12060, block: '66.187.180.244/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 1180 Peachtree'},
      { blockId: 12061, block: '66.187.181.0/24', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12062, block: '66.187.181.8/29', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Rav3'},
      { blockId: 12063, block: '66.187.181.184/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: VOIP'},
      { blockId: 12064, block: '66.187.182.1/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12065, block: '66.187.182.2/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12066, block: '66.187.182.3/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12067, block: '66.187.182.4/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12068, block: '66.187.182.5/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12069, block: '66.187.182.6/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12070, block: '66.187.182.7/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12071, block: '66.187.182.8/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12072, block: '66.187.182.10/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12073, block: '66.187.182.11/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12074, block: '66.187.182.20/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12075, block: '66.187.182.35/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12076, block: '66.187.182.40/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Dawsonville'},
      { blockId: 12077, block: '66.187.182.41/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12078, block: '66.187.182.50/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12079, block: '66.187.182.51/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Brookside1'},
      { blockId: 12080, block: '66.187.182.52/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12081, block: '66.187.182.53/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12082, block: '66.187.182.55/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 55 Marietta'},
      { blockId: 12083, block: '66.187.182.56/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12084, block: '66.187.182.63/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12085, block: '66.187.182.101/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Woodville'},
      { blockId: 12086, block: '66.187.182.104/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 104 Marietta'},
      { blockId: 12087, block: '66.187.182.117/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Mechanicsville'},
      { blockId: 12088, block: '66.187.182.118/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Cobb'},
      { blockId: 12089, block: '66.187.182.119/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Braselton'},
      { blockId: 12090, block: '66.187.182.120/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Bremen'},
      { blockId: 12091, block: '66.187.182.121/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: CCWT'},
      { blockId: 12092, block: '66.187.182.128/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12093, block: '66.187.182.129/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12094, block: '66.187.182.141/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12095, block: '66.187.182.153/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12096, block: '66.187.182.163/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: TSAV'},
      { blockId: 12097, block: '66.187.182.165/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12098, block: '66.187.182.172/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12099, block: '66.187.182.175/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12100, block: '66.187.182.176/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12101, block: '66.187.182.177/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12102, block: '66.187.182.178/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Minden'},
      { blockId: 12103, block: '66.187.182.199/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12104, block: '66.187.182.200/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12105, block: '66.187.182.201/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12106, block: '66.187.182.202/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 1180 Peachtree'},
      { blockId: 12107, block: '66.187.182.203/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Prominence'},
      { blockId: 12108, block: '66.187.182.204/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Winder'},
      { blockId: 12109, block: '66.187.182.205/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Scarbrough'},
      { blockId: 12110, block: '66.187.182.206/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Morgan Memorial'},
      { blockId: 12111, block: '66.187.182.207/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Madison'},
      { blockId: 12112, block: '66.187.182.209/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: HalpernsHQ'},
      { blockId: 12113, block: '66.187.182.210/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12114, block: '66.187.182.211/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Stone Mountain'},
      { blockId: 12115, block: '66.187.182.212/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12116, block: '66.187.182.213/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12117, block: '66.187.182.214/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12118, block: '66.187.182.215/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12119, block: '66.187.182.216/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12120, block: '66.187.182.217/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Huntcrest3'},
      { blockId: 12121, block: '66.187.182.218/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 270 Peachtree'},
      { blockId: 12122, block: '66.187.182.219/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12123, block: '66.187.182.220/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12124, block: '66.187.182.221/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Rav3'},
      { blockId: 12125, block: '66.187.182.222/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Prominence'},
      { blockId: 12126, block: '66.187.182.223/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12127, block: '66.187.182.224/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Pleasant Hill'},
      { blockId: 12128, block: '66.187.182.225/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Atkinson'},
      { blockId: 12129, block: '66.187.182.226/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12130, block: '66.187.182.227/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Brookside1'},
      { blockId: 12131, block: '66.187.182.228/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12132, block: '66.187.182.229/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12133, block: '66.187.182.230/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Huntcrest2'},
      { blockId: 12134, block: '66.187.182.231/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12135, block: '66.187.182.232/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 1180 Peachtree'},
      { blockId: 12136, block: '66.187.182.233/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Monroe'},
      { blockId: 12137, block: '66.187.182.234/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12138, block: '66.187.182.235/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12139, block: '66.187.182.236/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12140, block: '66.187.182.237/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12141, block: '66.187.182.238/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12142, block: '66.187.182.239/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Crawford Long'},
      { blockId: 12143, block: '66.187.182.240/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Woodville'},
      { blockId: 12144, block: '66.187.182.241/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Wildwood'},
      { blockId: 12145, block: '66.187.182.242/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12146, block: '66.187.182.243/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12147, block: '66.187.182.244/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12148, block: '66.187.182.245/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Northwinds 4'},
      { blockId: 12149, block: '66.187.182.246/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12150, block: '66.187.182.247/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Sawnee'},
      { blockId: 12151, block: '66.187.182.248/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Stone Mountain'},
      { blockId: 12152, block: '66.187.182.249/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12153, block: '66.187.182.250/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12154, block: '66.187.182.251/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Crescent Center'},
      { blockId: 12155, block: '66.187.182.252/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Promenade'},
      { blockId: 12156, block: '66.187.182.253/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12157, block: '66.187.182.254/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Millenium'},
      { blockId: 12158, block: '66.187.182.255/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12159, block: '66.187.183.200/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12160, block: '66.187.184.128/25', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Westin'},
      { blockId: 12161, block: '66.187.185.248/29', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Kingsbridge'},
      { blockId: 12162, block: '66.187.186.16/28', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12163, block: '66.187.186.32/27', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 55 Marietta'},
      { blockId: 12164, block: '66.187.186.184/29', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12165, block: '66.187.187.64/27', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Marist'},
      { blockId: 12166, block: '66.187.187.112/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Park Place'},
      { blockId: 12167, block: '66.187.188.0/25', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: iSigma'},
      { blockId: 12168, block: '66.187.188.128/25', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: iSigma'},
      { blockId: 12169, block: '66.187.189.0/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Crawford Long'},
      { blockId: 12170, block: '66.187.189.4/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Crawford Long'},
      { blockId: 12171, block: '66.187.189.8/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Millenium'},
      { blockId: 12172, block: '66.187.189.12/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Promenade'},
      { blockId: 12173, block: '66.187.189.16/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 1180 Peachtree'},
      { blockId: 12174, block: '66.187.189.20/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 1180 Peachtree'},
      { blockId: 12175, block: '66.187.189.24/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 55 Marietta'},
      { blockId: 12176, block: '66.187.189.28/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 55 Marietta'},
      { blockId: 12177, block: '66.187.189.32/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 55 Marietta'},
      { blockId: 12178, block: '66.187.189.40/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12179, block: '66.187.189.44/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12180, block: '66.187.189.48/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Promenade'},
      { blockId: 12181, block: '66.187.189.52/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Promenade'},
      { blockId: 12182, block: '66.187.189.60/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12183, block: '66.187.189.64/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12184, block: '66.187.189.68/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Minden'},
      { blockId: 12185, block: '66.187.189.100/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Stone Mountain'},
      { blockId: 12186, block: '66.187.189.104/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Wildwood'},
      { blockId: 12187, block: '66.187.189.112/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12188, block: '66.187.189.116/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12189, block: '66.187.189.120/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12190, block: '66.187.189.124/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 104 Marietta'},
      { blockId: 12191, block: '66.187.189.128/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12192, block: '66.187.189.132/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: One Ring Office'},
      { blockId: 12193, block: '66.187.189.140/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12194, block: '66.187.189.148/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12195, block: '66.187.189.152/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12196, block: '66.187.189.156/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12197, block: '66.187.189.160/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12198, block: '66.187.189.164/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12199, block: '66.187.189.168/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Rav3'},
      { blockId: 12200, block: '66.187.189.184/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12201, block: '66.187.189.188/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12202, block: '66.187.189.192/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12203, block: '66.187.189.196/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12204, block: '66.187.189.204/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12205, block: '66.187.189.212/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12206, block: '66.187.189.216/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Huntcrest2'},
      { blockId: 12207, block: '66.187.189.220/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12208, block: '66.187.190.128/29', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12209, block: '66.187.190.208/29', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12210, block: '66.187.190.224/27', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: US Cost'},
      { blockId: 12211, block: '66.187.191.0/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12212, block: '66.187.191.4/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 12213, block: '66.187.191.8/30', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: 56 Marietta'},
      { blockId: 12214, block: '66.187.191.12/30', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' },
      { blockId: 11462, block: '69.169.201.166/32', status: 'Active', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: 'pop: Kennesaw'},
      { blockId: 10752, block: '216.59.223.66/32', status: 'Inactive', notes: '', downstream_org_id: '', reverse_dns_1: '', reverse_dns_2: '', associations: '' }
      ]
  },

  getBlockTable(getBlocks) {
    let blocks = getBlocks;
    return {
      colNames: [
        { label: 'Block', name: 'block', cellType: 'string'},
        { label: 'Status', name: 'status', cellType: 'string'},
        { label: 'Notes', name: 'notes', cellType: 'string'},
        { label: 'Downstream Org ID', name: 'downstream_org_id', cellType: 'string'},
        { label: 'Reverse DNS 1', name: 'reverse_dns_1', cellType: 'string'},
        { label: 'Reverse DNS 2', name: 'reverse_dns_2', cellType: 'string'},
        { label: 'Associations', name: 'associations', cellType: 'string' },
        { label: '', name: 'edit', cellType: 'string', style: {textAlign: 'center'}}
      ],
      data: blocks.map(s => {
        s.edit = <div style={{textAlign: 'center'}}><RaisedButton label={'EDIT'} linkButton={true} href={`/#/ip-block/${s.blockId}/edit`} /></div>;
        return s;
      }),
      filters: {
        data: [
          { label: 'Block', filterType: 'muiTextField', name: 'block' },
          { label: 'Associations', filterType: 'muiTextField', name: 'associations' },
          { label: 'Status', filterType: 'muiRadioButtons', name: 'status', buttonGroup: { name: 'status', defaultSelected: 'both'}, buttons: [
            { label: 'Active', value: 'Active'},
            { label: 'Inactive', value: 'Inactive'},
            { label: 'Both', value: 'Both', defaultChecked: true}
          ] }
        ]
      },
      colWidths: [2,2,2,2,2,2,2,2],
      maxWidth: 16,
      widthAdj: -30
    };
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  render() {

    let action = "controller.cfm?event=manageIpBlocks";

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Details
          title={'IP Blocks'}
          widths={ {lg: ['0', '320px']}}
          rowStyle={{ float: 'left' }}
          cStyles={{ lg: [{textAlign: 'left'}] }}
          cPadding={'0'}
          data={[
              { label: '', value: <RaisedButton label="Assign New Block" />, detaildetailType: 'muiButton'}
          ]}
        />
        <Table {...this.getBlockTable(this.getBlocks())} />
    </Layout>
    );
  }
});

export default IpBlocks;
