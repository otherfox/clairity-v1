import React, {PropTypes} from 'react'
import {Paper, TextField} from 'material-ui'
import Layout from '../../shared/components/layout'
import DropDown from '../../shared/components/dropdown'
import Details from '../../shared/components/details'
import { List } from 'immutable'

export default class EditDetails extends React.Component {
  render() {
    return (
      <Paper>
        <Layout widths={{ lg: [6,6]}} cPadding={'0 20px 20px 20px'}>
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            rowStyle={{marginLeft: '15%'}}
            widths={{ lg: [4,8]}}
            title={'Account Details'}
            data={[
              { label: 'Current Account Owner', value: <TextField value={'Kit Carker'} disabled={true} />, detailType: 'muiTextField' },
              { label: 'Name', name: 'name', value: <TextField value={''}/>, detailType: 'muiTextField' },
              { label: 'Type', name: 'customerTypeId', value: <DropDown selectedValue={0} menuItems={ new List([
                { label: '', value: 0},
                { label: 'Business', value: 1 },
                { label: 'Residential', value: 2 },
                { label: 'Telenational - Business', value: 3 },
                { label: 'Telenational - Residential', value: 4 }
              ])} />, detailType: 'muiDropDown' },
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            widths={{ lg: [2,10]}}
            title={null}
            data={[
              { label: 'Street 1', name: 'customerStreet1', value: <TextField value={'15400 Knoll Trail'}/>, detailType: 'muiTextField' },
              { label: 'Street 2', name: 'customerStreet2', value: <TextField value={'Suite 400'}/>, detailType: 'muiTextField' },
              { label: 'City', name: 'customerCity', value: <TextField value={'Dallas'} />, detailType: 'muiTextField' },
              { label: 'State', name: 'customerState', value: <TextField value={'TX'} />, detailType: 'muiTextField' },
              { label: 'Zip Code', name: 'customerZip', value: <TextField value={75248} />, detailType: 'muiTextField' }
            ]}
          />
        </Layout>
      </Paper>
    );
  }
}
