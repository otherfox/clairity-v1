import React from "react"
import Link from '../shared/components/link'
import {FontIcon, ClearFix, Paper} from 'material-ui'
import ContractInfo from './public/details'

export default class ListContracts extends React.Component {
  style() {
      return {
        root: {},
        icon: {
          float: 'left',
          color: this.context.muiTheme.palette.accent1Color
        },
        link: {
          float: 'left',
          color: this.context.muiTheme.palette.textColor,
          lineHeight: '25px',
          marginLeft: '10px'
        }
      }
  }

  render() {
    return (
      <div style={this.style().root}>
        {
          this.props.contracts.map(contract =>
            <ClearFix key={contract.get('id')}>
              <Paper><ContractInfo contract={contract} /></Paper>
            </ClearFix>
          )
        }
      </div>
    );
  }
}

ListContracts.contextTypes = {
  muiTheme: React.PropTypes.object
}
