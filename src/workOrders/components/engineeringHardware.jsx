import React from 'react'
import Settings from '../../shared/components/settings'
import Layout from '../../shared/components/layout'
import DropDown from '../../shared/components/dropDown'
import Details from '../../shared/components/details'
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

import {List, Map, fromJS} from 'immutable'

let data = [];

let EngineeringHardware = React.createClass ({

  propTypes: {style: React.PropTypes.object,
    data: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      data: data
    };
  },

  style() {
    let style = {};

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        console.log(key);
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  render() {

    return (
      <div style={this.props.style}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{lg:[12],md:[12],sm:[12],xs:[12]}} pPadding={'0 20px 20px 20px'}>
            <div>
              <h3>Engineering Hardware</h3>
              <Details
                data = {[
                  { label: 'POP Router', name: 'pop_router_inventory_type_id', value: <div><DropDown menuItems={ new List([
                  new Map({ label: '', value: 1000, key: 51}),
                  new Map({ label: 'Cisco 7600 Series Router', value: 51, key: 51}),
                  new Map({ label: 'Canopy PTP 500', value: 50, key: 50}),
                  new Map({ label: 'Cisco 7300 Series Router', value: 33, key: 33}),
                  new Map({ label: 'Cisco 2600 Series Router', value: 37, key: 37}),
                  new Map({ label: 'ATI Rapier 24i Switch', value: 47, key: 47}),
                  new Map({ label: 'Adaptive Broadband', value: 52, key: 52}),
                  new Map({ label: 'Cisco 3845 Series Router', value: 63, key: 63}),
                  new Map({ label: 'Cisco 4700 Series Router', value: 43, key: 43}),
                  new Map({ label: 'Dragonwave', value: 21, key: 21}),
                  new Map({ label: 'BridgeWave 60Ghz', value: 11, key: 11}),
                  new Map({ label: 'LigoWave 900MHz', value: 45, key: 45}),
                  new Map({ label: 'Cisco 3500 Series Switch', value: 29, key: 29}),
                  new Map({ label: 'Cisco ASA 5510', value: 62, key: 62}),
                  new Map({ label: 'Nortel Baystack 350 Switch', value: 48, key: 48}),
                  new Map({ label: 'Cisco 3640 Series Router', value: 46, key: 46}),
                  new Map({ label: 'Motorola PTP 58400 Lite', value: 55, key: 55}),
                  new Map({ label: 'LigoWave 5GHz', value: 44, key: 44}),
                  new Map({ label: 'Gemini', value: 3, key: 3}),
                  new Map({ label: 'Cisco 7200 Series Router', value: 32, key: 32}),
                  new Map({ label: 'Trango M900', value: 16, key: 16}),
                  new Map({ label: 'Cisco 1900 Series Switch', value: 27, key: 27}),
                  new Map({ label: 'Canopy PTP 600', value: 39, key: 39}),
                  new Map({ label: 'Reignwire', value: 13, key: 13}),
                  new Map({ label: 'Tranzeo TR5a', value: 53, key: 53}),
                  new Map({ label: 'Canopy', value: 2, key: 2}),
                  new Map({ label: 'Wilibox', value: 14, key: 14}),
                  new Map({ label: 'Cisco 3550 Series Switch', value: 30, key: 30}),
                  new Map({ label: '3Com Intellijack', value: 18, key: 18}),
                  new Map({ label: 'Ubiquiti Nanostation M5', value: 66, key: 66}),
                  new Map({ label: 'Cisco 800 Series Router', value: 67, key: 67}),
                  new Map({ label: 'Ceragon', value: 15, key: 15}),
                  new Map({ label: 'Cisco IAD 2400', value: 59, key: 59}),
                  new Map({ label: 'Cisco 2800 Series Router', value: 41, key: 41}),
                  new Map({ label: 'Canopy PTP 400', value: 40, key: 40}),
                  new Map({ label: 'Cisco 2948 Series Switch', value: 42, key: 42}),
                  new Map({ label: 'NetGear', value: 23, key: 23}),
                  new Map({ label: 'Netopia 3386', value: 60, key: 60}),
                  new Map({ label: 'Redline AN80', value: 24, key: 24}),
                  new Map({ label: 'Cisco 6500 Series Switch', value: 34, key: 34}),
                  new Map({ label: 'DLB 2700', value: 61, key: 61}),
                  new Map({ label: 'Trango M5800', value: 22, key: 22}),
                  new Map({ label: 'Trango M2400', value: 17, key: 17}),
                  new Map({ label: 'Audiocodes', value: 20, key: 20}),
                  new Map({ label: 'Atlas', value: 4, key: 4}),
                  new Map({ label: 'Cisco 2900 Series Switch', value: 28, key: 28}),
                  new Map({ label: 'BridgeWave 80Ghz', value: 12, key: 12}),
                  new Map({ label: 'Cisco 1800 Series Router', value: 31, key: 31}),
                  new Map({ label: 'Spectra', value: 6, key: 6}),
                  new Map({ label: 'Colubris', value: 19, key: 19}),
                  new Map({ label: 'Cisco 3750 Series Switch', value: 36, key: 36}),
                  new Map({ label: 'Cisco 1700 Series Router', value: 38, key: 38}),
                  new Map({ label: 'Cisco 12000 Series Router', value: 35, key: 35}),
                  new Map({ label: 'Cisco 3560 Series Switch', value: 49, key: 49}),
                  new Map({ label: 'CPE', value: 5, key: 5}),
                  new Map({ label: 'Cisco 4500 Series Switch', value: 64, key: 64}),
                  new Map({ label: 'RAD RICi', value: 54, key: 54}),
                  new Map({ label: 'Ubiquiti Rocket M5', value: 65, key: 65}),
                  new Map({ label: 'Dell Switch', value: 25, key: 25}),
                  new Map({ label: 'Cisco 7600 Series Router', value: 51, key: 51}),
                  new Map({ label: 'Canopy PTP 500', value: 50, key: 50}),
                  new Map({ label: 'Cisco 7300 Series Router', value: 33, key: 33}),
                  new Map({ label: 'Cisco 2600 Series Router', value: 37, key: 37}),
                  new Map({ label: 'ATI Rapier 24i Switch', value: 47, key: 47}),
                  new Map({ label: 'Adaptive Broadband', value: 52, key: 52}),
                  new Map({ label: 'Cisco 3845 Series Router', value: 63, key: 63}),
                  new Map({ label: 'Cisco 4700 Series Router', value: 43, key: 43}),
                  new Map({ label: 'Dragonwave', value: 21, key: 21}),
                  new Map({ label: 'BridgeWave 60Ghz', value: 11, key: 11}),
                  new Map({ label: 'LigoWave 900MHz', value: 45, key: 45}),
                  new Map({ label: 'Cisco 3500 Series Switch', value: 29, key: 29}),
                  new Map({ label: 'Cisco ASA 5510', value: 62, key: 62}),
                  new Map({ label: 'Nortel Baystack 350 Switch', value: 48, key: 48}),
                  new Map({ label: 'Cisco 3640 Series Router', value: 46, key: 46}),
                  new Map({ label: 'Motorola PTP 58400 Lite', value: 55, key: 55}),
                  new Map({ label: 'LigoWave 5GHz', value: 44, key: 44}),
                  new Map({ label: 'Gemini', value: 3, key: 3}),
                  new Map({ label: 'Cisco 7200 Series Router', value: 32, key: 32}),
                  new Map({ label: 'Trango M900', value: 16, key: 16}),
                  new Map({ label: 'Cisco 1900 Series Switch', value: 27, key: 27}),
                  new Map({ label: 'Canopy PTP 600', value: 39, key: 39}),
                  new Map({ label: 'Reignwire', value: 13, key: 13}),
                  new Map({ label: 'Tranzeo TR5a', value: 53, key: 53}),
                  new Map({ label: 'Canopy', value: 2, key: 2}),
                  new Map({ label: 'Wilibox', value: 14, key: 14}),
                  new Map({ label: 'Cisco 3550 Series Switch', value: 30, key: 30}),
                  new Map({ label: '3Com Intellijack', value: 18, key: 18}),
                  new Map({ label: 'Ubiquiti Nanostation M5', value: 66, key: 66}),
                  new Map({ label: 'Cisco 800 Series Router', value: 67, key: 67}),
                  new Map({ label: 'Ceragon', value: 15, key: 15}),
                  new Map({ label: 'Cisco IAD 2400', value: 59, key: 59}),
                  new Map({ label: 'Cisco 2800 Series Router', value: 41, key: 41}),
                  new Map({ label: 'Canopy PTP 400', value: 40, key: 40}),
                  new Map({ label: 'Cisco 2948 Series Switch', value: 42, key: 42}),
                  new Map({ label: 'NetGear', value: 23, key: 23}),
                  new Map({ label: 'Netopia 3386', value: 60, key: 60}),
                  new Map({ label: 'Redline AN80', value: 24, key: 24}),
                  new Map({ label: 'Cisco 6500 Series Switch', value: 34, key: 34}),
                  new Map({ label: 'DLB 2700', value: 61, key: 61}),
                  new Map({ label: 'Trango M5800', value: 22, key: 22}),
                  new Map({ label: 'Trango M2400', value: 17, key: 17}),
                  new Map({ label: 'Audiocodes', value: 20, key: 20}),
                  new Map({ label: 'Atlas', value: 4, key: 4}),
                  new Map({ label: 'Cisco 2900 Series Switch', value: 28, key: 28}),
                  new Map({ label: 'BridgeWave 80Ghz', value: 12, key: 12}),
                  new Map({ label: 'Cisco 1800 Series Router', value: 31, key: 31}),
                  new Map({ label: 'Spectra', value: 6, key: 6}),
                  new Map({ label: 'Colubris', value: 19, key: 19}),
                  new Map({ label: 'Cisco 3750 Series Switch', value: 36, key: 36}),
                  new Map({ label: 'Cisco 1700 Series Router', value: 38, key: 38}),
                  new Map({ label: 'Cisco 12000 Series Router', value: 35, key: 35}),
                  new Map({ label: 'Cisco 3560 Series Switch', value: 49, key: 49}),
                  new Map({ label: 'CPE', value: 5, key: 5}),
                  new Map({ label: 'Cisco 4500 Series Switch', value: 64, key: 64}),
                  new Map({ label: 'RAD RICi', value: 54, key: 54}),
                  new Map({ label: 'Ubiquiti Rocket M5', value: 65, key: 65}),
                  new Map({ label: 'Canopy 900Mhz', value: 10, key: 10}),
                  new Map({ label: 'Dell Switch', value: 25, key: 25}),
                  ])} selectedValue= {1000} /><Checkbox label={'Configured and Tested'} name={'radios_configured'} /></div>, detailType: "muiDropDown"},
                  { label: 'Voice CPE', name: 'voice_cpe_inventory_type_id', value: <div><DropDown menuItems={ new List([
                    new Map({ label: '', value: 1000, key: 51}),
                    new Map({ label: 'Cisco 7600 Series Router', value: 51, key: 51}),
                    new Map({ label: 'Canopy PTP 500', value: 50, key: 50}),
                    new Map({ label: 'Cisco 7300 Series Router', value: 33, key: 33}),
                    new Map({ label: 'Cisco 2600 Series Router', value: 37, key: 37}),
                    new Map({ label: 'ATI Rapier 24i Switch', value: 47, key: 47}),
                    new Map({ label: 'Adaptive Broadband', value: 52, key: 52}),
                    new Map({ label: 'Cisco 3845 Series Router', value: 63, key: 63}),
                    new Map({ label: 'Cisco 4700 Series Router', value: 43, key: 43}),
                    new Map({ label: 'Dragonwave', value: 21, key: 21}),
                    new Map({ label: 'BridgeWave 60Ghz', value: 11, key: 11}),
                    new Map({ label: 'LigoWave 900MHz', value: 45, key: 45}),
                    new Map({ label: 'Cisco 3500 Series Switch', value: 29, key: 29}),
                    new Map({ label: 'Cisco ASA 5510', value: 62, key: 62}),
                    new Map({ label: 'Nortel Baystack 350 Switch', value: 48, key: 48}),
                    new Map({ label: 'Cisco 3640 Series Router', value: 46, key: 46}),
                    new Map({ label: 'Motorola PTP 58400 Lite', value: 55, key: 55}),
                    new Map({ label: 'LigoWave 5GHz', value: 44, key: 44}),
                    new Map({ label: 'Gemini', value: 3, key: 3}),
                    new Map({ label: 'Cisco 7200 Series Router', value: 32, key: 32}),
                    new Map({ label: 'Trango M900', value: 16, key: 16}),
                    new Map({ label: 'Cisco 1900 Series Switch', value: 27, key: 27}),
                    new Map({ label: 'Canopy PTP 600', value: 39, key: 39}),
                    new Map({ label: 'Reignwire', value: 13, key: 13}),
                    new Map({ label: 'Exalt(16)', value: 8, key: 8}),
                    new Map({ label: 'Exalt(16)', value: 8, key: 8}),
                    new Map({ label: 'Tranzeo TR5a', value: 53, key: 53}),
                    new Map({ label: 'Canopy', value: 2, key: 2}),
                    new Map({ label: 'Wilibox', value: 14, key: 14}),
                    new Map({ label: 'Cisco 3550 Series Switch', value: 30, key: 30}),
                    new Map({ label: '3Com Intellijack', value: 18, key: 18}),
                    new Map({ label: 'Ubiquiti Nanostation M5', value: 66, key: 66}),
                    new Map({ label: 'Cisco 800 Series Router', value: 67, key: 67}),
                    new Map({ label: 'Ceragon', value: 15, key: 15}),
                    new Map({ label: 'Cisco IAD 2400', value: 59, key: 59}),
                    new Map({ label: 'Cisco 2800 Series Router', value: 41, key: 41}),
                    new Map({ label: 'Canopy PTP 400', value: 40, key: 40}),
                    new Map({ label: 'Cisco 2948 Series Switch', value: 42, key: 42}),
                    new Map({ label: 'NetGear', value: 23, key: 23}),
                    new Map({ label: 'Netopia 3386', value: 60, key: 60}),
                    new Map({ label: 'Redline AN80', value: 24, key: 24}),
                    new Map({ label: 'Cisco 6500 Series Switch', value: 34, key: 34}),
                    new Map({ label: 'DLB 2700', value: 61, key: 61}),
                    new Map({ label: 'Trango M5800', value: 22, key: 22}),
                    new Map({ label: 'Trango M2400', value: 17, key: 17}),
                    new Map({ label: 'Audiocodes', value: 20, key: 20}),
                    new Map({ label: 'Atlas', value: 4, key: 4}),
                    new Map({ label: 'Cisco 2900 Series Switch', value: 28, key: 28}),
                    new Map({ label: 'BridgeWave 80Ghz', value: 12, key: 12}),
                    new Map({ label: 'Cisco 1800 Series Router', value: 31, key: 31}),
                    new Map({ label: 'Spectra', value: 6, key: 6}),
                    new Map({ label: 'Colubris', value: 19, key: 19}),
                    new Map({ label: 'Cisco 3750 Series Switch', value: 36, key: 36}),
                    new Map({ label: 'Cisco 1700 Series Router', value: 38, key: 38}),
                    new Map({ label: 'Cisco 12000 Series Router', value: 35, key: 35}),
                    new Map({ label: 'Cisco 3560 Series Switch', value: 49, key: 49}),
                    new Map({ label: 'CPE', value: 5, key: 5}),
                    new Map({ label: 'Cisco 4500 Series Switch', value: 64, key: 64}),
                    new Map({ label: 'RAD RICi', value: 54, key: 54}),
                    new Map({ label: 'Ubiquiti Rocket M5', value: 65, key: 65}),
                    new Map({ label: 'Canopy 900Mhz', value: 10, key: 10}),
                    new Map({ label: 'Dell Switch', value: 25, key: 25}),
                  ])} selectedValue= {1000} /><Checkbox label={'Configured and Tested'} name={'voice_cpe_configured'} /></div>, detailType: "muiDropDown"},
                  { label: 'Other Hardware', name: 'other_inventory_type_id', value: <div><DropDown menuItems={ new List([
                  new Map({ label: '', value: 1000, key: 51}),
                  new Map({ label: 'Cisco 7600 Series Router', value: 51, key: 51}),
                  new Map({ label: 'Canopy PTP 500', value: 50, key: 50}),
                  new Map({ label: 'Cisco 7300 Series Router', value: 33, key: 33}),
                  new Map({ label: 'Cisco 2600 Series Router', value: 37, key: 37}),
                  new Map({ label: 'ATI Rapier 24i Switch', value: 47, key: 47}),
                  new Map({ label: 'Adaptive Broadband', value: 52, key: 52}),
                  new Map({ label: 'Cisco 3845 Series Router', value: 63, key: 63}),
                  new Map({ label: 'Cisco 4700 Series Router', value: 43, key: 43}),
                  new Map({ label: 'Dragonwave', value: 21, key: 21}),
                  new Map({ label: 'BridgeWave 60Ghz', value: 11, key: 11}),
                  new Map({ label: 'LigoWave 900MHz', value: 45, key: 45}),
                  new Map({ label: 'Cisco 3500 Series Switch', value: 29, key: 29}),
                  new Map({ label: 'Cisco ASA 5510', value: 62, key: 62}),
                  new Map({ label: 'Nortel Baystack 350 Switch', value: 48, key: 48}),
                  new Map({ label: 'Cisco 3640 Series Router', value: 46, key: 46}),
                  new Map({ label: 'Motorola PTP 58400 Lite', value: 55, key: 55}),
                  new Map({ label: 'LigoWave 5GHz', value: 44, key: 44}),
                  new Map({ label: 'Gemini', value: 3, key: 3}),
                  new Map({ label: 'Cisco 7200 Series Router', value: 32, key: 32}),
                  new Map({ label: 'Trango M900', value: 16, key: 16}),
                  new Map({ label: 'Cisco 1900 Series Switch', value: 27, key: 27}),
                  new Map({ label: 'Canopy PTP 600', value: 39, key: 39}),
                  new Map({ label: 'Reignwire', value: 13, key: 13}),
                  new Map({ label: 'Tranzeo TR5a', value: 53, key: 53}),
                  new Map({ label: 'Canopy', value: 2, key: 2}),
                  new Map({ label: 'Wilibox', value: 14, key: 14}),
                  new Map({ label: 'Cisco 3550 Series Switch', value: 30, key: 30}),
                  new Map({ label: '3Com Intellijack', value: 18, key: 18}),
                  new Map({ label: 'Ubiquiti Nanostation M5', value: 66, key: 66}),
                  new Map({ label: 'Cisco 800 Series Router', value: 67, key: 67}),
                  new Map({ label: 'Ceragon', value: 15, key: 15}),
                  new Map({ label: 'Cisco IAD 2400', value: 59, key: 59}),
                  new Map({ label: 'Cisco 2800 Series Router', value: 41, key: 41}),
                  new Map({ label: 'Canopy PTP 400', value: 40, key: 40}),
                  new Map({ label: 'Cisco 2948 Series Switch', value: 42, key: 42}),
                  new Map({ label: 'NetGear', value: 23, key: 23}),
                  new Map({ label: 'Netopia 3386', value: 60, key: 60}),
                  new Map({ label: 'Redline AN80', value: 24, key: 24}),
                  new Map({ label: 'Cisco 6500 Series Switch', value: 34, key: 34}),
                  new Map({ label: 'DLB 2700', value: 61, key: 61}),
                  new Map({ label: 'Trango M5800', value: 22, key: 22}),
                  new Map({ label: 'Trango M2400', value: 17, key: 17}),
                  new Map({ label: 'Audiocodes', value: 20, key: 20}),
                  new Map({ label: 'Atlas', value: 4, key: 4}),
                  new Map({ label: 'Cisco 2900 Series Switch', value: 28, key: 28}),
                  new Map({ label: 'BridgeWave 80Ghz', value: 12, key: 12}),
                  new Map({ label: 'Cisco 1800 Series Router', value: 31, key: 31}),
                  new Map({ label: 'Spectra', value: 6, key: 6}),
                  new Map({ label: 'Colubris', value: 19, key: 19}),
                  new Map({ label: 'Cisco 3750 Series Switch', value: 36, key: 36}),
                  new Map({ label: 'Cisco 1700 Series Router', value: 38, key: 38}),
                  new Map({ label: 'Cisco 12000 Series Router', value: 35, key: 35}),
                  new Map({ label: 'Cisco 3560 Series Switch', value: 49, key: 49}),
                  new Map({ label: 'CPE', value: 5, key: 5}),
                  new Map({ label: 'Cisco 4500 Series Switch', value: 64, key: 64}),
                  new Map({ label: 'RAD RICi', value: 54, key: 54}),
                  new Map({ label: 'Ubiquiti Rocket M5', value: 65, key: 65}),
                  new Map({ label: 'Canopy 900Mhz', value: 10, key: 10}),
                  new Map({ label: 'Dell Switch', value: 25, key: 25}),
                  ])} selectedValue= {1000} /><Checkbox label={'Configured and Tested'} name={'other_configured'} /></div>, detailType: "muiDropDown"},
                  { label: 'Voice Handoff Type', name: 'voice_handoff_type', value: <TextField multiLine={true} />, detailType: 'muiTextField' },
                  { label: 'Master Radio MAC', name: 'master_radio_mac', value: <TextField multiLine={true} />, detailType: 'muiTextField' },
                  { label: 'Slave Radio MAC', name: 'slave_radio_mac', value: <TextField multiLine={true} />, detailType: 'muiTextField' },
                  { label: 'Frequency', name: 'frequency', value: <TextField multiLine={true} />, detailType: 'muiTextField' },
                  { label: 'Transeiver Serial Number', name: 'transeiver_serial_number', value: <TextField multiLine={true} />, detailType: 'muiTextField' },
                  { label: 'BTS Serial Number', name: 'bts_serial_number', value: <TextField multiLine={true} />, detailType: 'muiTextField' },
                  { label: '', name: 'pop_router_ports_assigned', value: <Checkbox label={'POP Router Ports Assigned'} name={'pop_router_ports_assigned'} />, detailType: 'muiTextField' },
                  { label: '', name: 'voice_provisioning_complete', value: <Checkbox label={'Voice Provisioning Complete'} name={'voice_provisioning_complete'} />, detailType: 'muiTextField' },
                  { label: 'Notes', name: 'hardware_notes', value: <TextField multiLine={true} />, detailType: 'muiTextField' },
                  { label: '', value: <RaisedButton primary label="Update" />, detailType: 'muiButton'}

                ]}
              />
              </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default EngineeringHardware;
