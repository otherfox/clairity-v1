import React from 'react'
import Settings from '../../shared/components/settings'
import Layout from '../../shared/components/layout'
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

let Engineering = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    data: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      data: []
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
              <Details title={'Engineering'}
                data = {[
                  { label: '', value:<Layout widths={{lg: [12,12,12], md: [12,12,12], sm: [12,12,12], xs: [12,12,12]}}><Checkbox name={'circuit_provisioned_in_ample'} label={'Circuit Built in AMPLE'} /><Checkbox name={'provisioning_notified'} label={'Provisioning Notified'} /><Checkbox name={'swip_completed'} label={'SWIP Completed'} /><Checkbox name={'orion_monitored'} label={'Monitored in Orion'} /></Layout>, detailType: 'muiTextField' },
                  { label: '', value:<RaisedButton onClick={() => this.refs.pop.submit()} primary label="Update" />, detailType: 'muiButton' }
                ]}
              />
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default Engineering;