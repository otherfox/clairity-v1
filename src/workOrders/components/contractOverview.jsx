import React from 'react'
import Settings from '../../shared/components/settings'
import {
  Paper,
  DropDownMenu
} from 'material-ui'


let data = [];

let ContractOverview = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    data: React.PropTypes.array,
    orderId: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      data: data,
      orderId: 1538
    };
  },

  updateState() {
    this.setState({contractId: ''});
  },

  handleCustomerChange(event) {
    // let workOrder = ;
    // let customer = location.customer;
    // customer[event.target.name] = event.target.value;
    // location.customer = customer;
    // this.setState({location});
    // this.copyCustomerToLocation();
  },

  componentWillMount() {
    fetchContracts(this.props.orderId);
    fetchContract(this.state.contractId)
  },

  componentDidMount() {
    this.updateState();
    Store.on('update', () => this.updateState());
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
      <div style={this.style()}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{ lg: [12,12,12], md: [12,12,12], sm: [12,12,12], xs: [12,12,12], xxs: [12,12,12]}} pPadding={'0 20px 20px 20px'} cPadding={'0 0 20px 0'}>
            <div>
              <h4>Contract Overview</h4>
            </div>
            <div>
              <DropDownMenu menuItems={this.state.contracts} selectedIndex={this.state.selectedContract} onChange={this.handleContractChange.bind(this)}/>
            </div>
            <div>
              <Table></Table>
            </div>
            <div>
              <Table></Table>
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default ContractOverview;
