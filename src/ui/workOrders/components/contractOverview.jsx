import React, {addons} from 'react/addons'
import { Paper } from 'material-ui'
import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
import ContractsDropdown from './contractList'
import ContractSingle from './contractSingle'

import WorkOrder from '../services/stubs/order1583.json'
import Contract from '../services/stubs/contract7416.json'

import { List, Map, fromJS } from 'immutable'

const ContractOverview = React.createClass({
  mixins:[addons.LinkedStateMixin],

  propTypes: {
    style: React.PropTypes.object,
    id: React.PropTypes.number,
    location: React.PropTypes.object,
    order: React.PropTypes.object,
    contract: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      order: WorkOrder
    }
  },

  getInitialState() {
    return {
      selectedContract: this.props.order.contract_id
    };
  },

  render() {
    return (
      <div style={this.props.style}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{lg: [3, 9,12], md: [12, 12,12]}} pPadding={'0 20px 20px 20px'}>
            <Details title={'Contracts'} />
            <div>
              <ContractsDropdown style={{paddingTop: '10px'}}
                                 locationId={this.props.locationId}
                                 valueLink={this.linkState('selectedContract')} />
            </div>
            <div>
              <ContractSingle id={this.state.selectedContract} />
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default ContractOverview;
