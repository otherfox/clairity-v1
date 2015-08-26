import React, { PropTypes, addons, Component } from 'react/addons'
import { Paper, TextField } from 'material-ui'
import { contextTypes, propTypes } from '../../shared/decorators'
import Layout from '../../shared/components/layout'
import DropDown from '../../shared/components/dropDown'
import Details from '../../shared/components/details'
import controllable from 'react-controllables'
import capitalize from 'capitalize'

@controllable([])
@propTypes({
  name: PropTypes.string.isRequired,
  customerTypeId: PropTypes.number.isRequired,
  street1: PropTypes.string.isRequired,
  street2: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipCode: PropTypes.number.isRequired,
  user: PropTypes.object
})
class EditDetail extends Component {
  link(propName) {
    return {
      value: this.props[propName],
      onChange: this.props[`on${capitalize(propName)}Change`]
    }
  }
  render() {
    // let account = this.props.account;
    let agent = this.props.user || {};
    return (
      <Paper>
        <Layout widths={{ lg: [6,6]}} cPadding={'0 20px 20px 20px'}>
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            rowStyle={{marginLeft: '15%'}}
            widths={{ lg: [4,8]}}
            title={'Account Details'}
            data={[
              agent.name ? { label: 'Current Account Owner', value: <TextField value={agent.name} disabled={true} />, detailType: 'muiTextField' } : null,
              { label: 'Name', name: 'name', value: <TextField {...this.link('name')} />, detailType: 'muiTextField' },
              { label: 'Type', name: 'customerTypeId', value: <DropDown valueLink={this.linkState('customerTypeId')} menuItems={[
                { label: '', value: 0 /* TODO: make this a real `collectionDropdown` */},
                { label: 'Business', value: 1 },
                { label: 'Residential', value: 2 },
                { label: 'Telenational - Business', value: 3 },
                { label: 'Telenational - Residential', value: 4 }
              ]} />, detailType: 'muiDropDown' },
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            widths={{ lg: [2,10]}}
            title={null}
            data={[
              { label: 'Street 1', name: 'customerStreet1', value: <TextField valueLink={this.linkState('street1')} />, detailType: 'muiTextField' },
              { label: 'Street 2', name: 'customerStreet2', value: <TextField valueLink={this.linkState('street2')} />, detailType: 'muiTextField' },
              { label: 'City', name: 'customerCity', value: <TextField valueLink={this.linkState('city')} />, detailType: 'muiTextField' },
              { label: 'State', name: 'customerState', value: <TextField valueLink={this.linkState('state')} />, detailType: 'muiTextField' },
              { label: 'Zip Code', name: 'customerZip', value: <TextField valueLink={this.linkState('zip_code')} />, detailType: 'muiTextField' }
            ]}
          />
        </Layout>
      </Paper>
    );
  }
}

let EditDetails = React.createClass({
  mixins: [addons.LinkedStateMixin],
  getInitialState() {
    let o = this.props.account;
    return {
      name: o.name,
      customerTypeId: o.type.id,
      street1: o.street1,
      street2: o.street2,
      city: o.city,
      state: o.state,
      zip_code: o.zip_code
    };
  },
  getState() {
    return this.state;
  },
  render() {
    let account = this.props.account;
    let agent = this.props.user ? this.props.user : {};
    return (
      <Paper>
        <Layout widths={{ lg: [6,6]}} cPadding={'0 20px 20px 20px'}>
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            rowStyle={{marginLeft: '15%'}}
            widths={{ lg: [4,8]}}
            title={'Account Details'}
            data={[
              agent.name ? { label: 'Current Account Owner', value: <TextField value={agent.name} disabled={true} />, detailType: 'muiTextField' } : null,
              { label: 'Name', name: 'name', value: <TextField valueLink={this.linkState('name')} />, detailType: 'muiTextField' },
              { label: 'Type', name: 'customerTypeId', value: <DropDown valueLink={this.linkState('customerTypeId')} menuItems={[
                { label: '', value: 0 /* TODO: make this a real `collectionDropdown` */},
                { label: 'Business', value: 1 },
                { label: 'Residential', value: 2 },
                { label: 'Telenational - Business', value: 3 },
                { label: 'Telenational - Residential', value: 4 }
              ]} />, detailType: 'muiDropDown' },
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            widths={{ lg: [2,10]}}
            title={null}
            data={[
              { label: 'Street 1', name: 'customerStreet1', value: <TextField valueLink={this.linkState('street1')} />, detailType: 'muiTextField' },
              { label: 'Street 2', name: 'customerStreet2', value: <TextField valueLink={this.linkState('street2')} />, detailType: 'muiTextField' },
              { label: 'City', name: 'customerCity', value: <TextField valueLink={this.linkState('city')} />, detailType: 'muiTextField' },
              { label: 'State', name: 'customerState', value: <TextField valueLink={this.linkState('state')} />, detailType: 'muiTextField' },
              { label: 'Zip Code', name: 'customerZip', value: <TextField valueLink={this.linkState('zip_code')} />, detailType: 'muiTextField' }
            ]}
          />
        </Layout>
      </Paper>
    );
  }
});

export default EditDetails;
