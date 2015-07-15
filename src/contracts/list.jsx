import React from "react"
import {Link} from 'react-router'
import {FontIcon, ClearFix} from 'material-ui'

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
    debugger;
    return (
      <div style={this.style().root}>
        {
          this.props.contracts.map(o =>
            <ClearFix>
              <Link to="view-opp" params={{oppId: o.get('id')}}>
                <FontIcon className={'md md-stars'} style={this.style().icon}/> <div style={this.style().link}>{o.toJS().toString()}</div>
              </Link>
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
