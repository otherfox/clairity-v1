import React, {addons} from 'react/addons'
import {collectionViaDropdown} from '../../shared/components/collectionDropdown'

let ContractsDropdown = collectionViaDropdown('contract', 'location_id', 'location');

export default class ContractsList extends React.Component {
  getContractLabel(contract) {
    return contract.get('services') ?
        `Signed ${signed.toDateString()} - ${contract.getIn(['services', 0, 'actual_name'])}`
      :
        `Signed ${signed.toDateString()}`
  }
  filterContract(contract) {
    return contract.has('signed');
  }
  render() {
    return (
      <ContractsDropdown {...this.props}
                         includeBlank={false}
                         getLabel={this.getLabel}
                         filterBy={this.filterContract} />
    );
  }
}
