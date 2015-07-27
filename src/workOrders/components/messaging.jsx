import React from 'react'
import Settings from '../../shared/components/settings'
import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
import List from '../../shared/components/list'
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

let data = [];

let Messaging = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
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
              <Details title={'Messaging'}
                widths={{lg: [1, 11]}}
                data = {[
                  { label: '', value: <div className={'full'}><TextField style={{width: '100%'}} mulitLine={true} /></div>, detailType: 'muiTextField'},
                  { label: '', value: <div style={{marginBottom: '30px', textAlign: 'right'}}><RaisedButton primary label="Add Message" /></div>},
                ]}
              />

              <List
                data= {[
                { label: 'Nancy Morefield', date:'07/16/2014 9:58 AM', value: '1-877-408-8967 added to account.  Physical location Stephen Exley, LLC in Spring, TX.'},
                { label: 'D. Garcia', date:'07/15/2014 3:43 PM', value: ' LNP Order 147928 for TN 2812470011 has been rejected for no account found. Thank You!'},
                { label: 'D. Garcia', date:'07/14/2014 5:04 PM', value: ' LNP Order Submitted:147928 for TN2812470011. Thank you!'},
                { label: 'D. Garcia', date:'07/02/2014 2:59 PM', value: ' LNP Order #147124 for TN2812470011 was cancel due to incorrect information on LOA. Gayla Snow will email another LOA with correct info.'},
                { label: 'D. Garcia', date:'06/27/2014 2:46 PM', value: ' LNP Order Submitted:147124 for TN 281-247-0011. Order for TFN (1-877-408-8967)has been emailed to Nancy.'},
                { label: 'D. Garcia', date:'06/27/2014 2:45 PM', value: ' LNP Order Submitted:147124 for TN 281-247-0011. Order for TFN (1-877-408-8967)has been emailed to Nancy.'},
                { label: 'Sotheara Leang', date:'05/07/2014 7:46 PM', value: ' Closing WO. '},
                { label: 'D. Garcia', date:'04/14/2014 10:30 AM', value: ' Port from WCI FOC confirm for 4/16/2014. For TN’s 817-500-5001, 817-500-5005, 817-500-5008-5012.'},
                { label: 'Sotheara Leang', date:'04/08/2014 3:06 PM', value: ' Number is built in DMS.  '},
                { label: 'D. Garcia', date:'04/08/2014 12:33 PM', value: ' Port from WCI FOC confirm for 4/09/2014.'},
                { label: 'D. Garcia', date:'04/08/2014 12:11 PM', value: ' LSR was submitted for Schreimann &amp; Assoc for TN 469-647-3570 DD:04/09/14..'},
                { label: 'Joshua Phoenix', date:'03/28/2014 3:31 PM', value: ' Devices in Orion.'},
                { label: 'Joshua Phoenix', date:'03/27/2014 2:04 AM', value: 'Assignments, POP config and SWIP complete.'},
                { label: 'Joshua Phoenix', date:'03/27/2014 2:03 AM', value: `dfw.rtr01.danschreimannandassociates#sh inv
                NAME: "2811 chassis", DESCR: "2811 chassis"
                PID: CISCO2811         , VID: V05 , SN: FTX1212A45S
                Loaded on cable 4`, detailType: 'muiTextField'},
                { label: 'Sotheara Leang', date:'03/25/2014 10:01 AM', value: 'Service from Westin West MP2.  Need assignments and configs.  '},
                { label: 'Jason Fisher', date:'03/19/2014 10:41 AM', value: ` The following Toll Free numbers have been ported.
                8007194096, 8772495035, 8772495818, 8772495822, 8774079194, 8774096702`, detailType: 'muiTextField'},
                { label: 'Jason Fisher', date:'03/11/2014 12:16 PM', value: ' Previous order canceled all the required DID numbers were not included on the LOA, The new order is LNP Order Submitted:141325'},
                { label: 'Jason Fisher', date:'02/28/2014 11:35 AM', value: ' LNP Order Submitted:140827 RDD 03/04/2014'}
                ]} />
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default Messaging;
