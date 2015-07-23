import React, {PropTypes, addons} from 'react/addons'
import {collectionViaDropdown} from '../../shared/components/collectionDropdown'

let ContractsDropdown = collectionViaDropdown('contract', 'location_id', 'location');

class ContractsList extends React.Component {

  getContractLabel(contract) {
    let signed = new Date(contract.get('signed'));
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
                         getLabel={this.getContractLabel}
                         filterBy={this.filterContract} />
    );
  }
}

ContractsList.propTypes = {
  locationId: PropTypes.number.isRequired
};

export default ContractsList;
