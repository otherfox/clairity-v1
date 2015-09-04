import React from 'react'
import mui, {IconButton, Toggle, FloatingActionButton, FontIcon, Utils, Styles} from 'material-ui'
import Link from '../link'
import async, {model} from '../async'
import numeral from 'numeral'
import AgentIcon from 'material-ui/lib/svg-icons/action/account-circle'
import AccountIcon from 'material-ui/lib/svg-icons/action/verified-user'
import ContactIcon from 'material-ui/lib/svg-icons/action/assignment-ind'
import SendIcon from 'material-ui/lib/svg-icons/content/send'

export class AgentCell extends React.Component {
  render() {
    return (this.props.children) ?
      <Link to='view-user' params={{userId: (this.props.data) ? this.props.data[this.props.idField || 'id'] : '' }} style={_.assign({
          color: this.context.muiTheme.palette.primary1Color
        }, this.props.cellStyle
      )}>
        <AgentIcon style={_.assign(
          { fill: Utils.ColorManipulator
              .fade(this.context.muiTheme.palette.primary1Color, .5),
            marginRight: '5px',
            position: 'absolute' },
          this.props.iconStyle)} />
        <div style={_.assign({
            paddingLeft: '30px',
            lineHeight: '25px'
          }, this.props.labelStyle
        )}>
          {this.props.children}
        </div>
      </Link> : null;
  }
}

import UserName from '../../../users/public/name'

export class AgentByIdCell extends React.Component {
  render() {
    let User = async( UserName, {user: model('user')});
    return (<User userId={this.props.data[this.props.userId]}/>)
  }
}

export class AccountCell extends React.Component {
  render() {
    return (this.props.children) ?
      <Link to="view-account"
            params={{accountId: (this.props.data) ? this.props.data[this.props.idField || 'id'] : '' }}
            style={_.assign({
              color: this.context.muiTheme.palette.accent1Color
            }, this.props.cellStyle)
      }>
        <AccountIcon style={_.assign({
            fill: Utils.ColorManipulator
              .fade(this.context.muiTheme.palette.accent1Color, .5),
            marginRight: '5px',
            position: 'absolute'
          }, this.props.iconStyle
        )} />
        <div style={_.assign({
            paddingLeft: '30px',
            lineHeight: '25px'
          }, this.props.labelStyle
        )}>
          {this.props.children}
        </div>
      </Link> : null;
  }
}

import AccountName from '../../../accounts/public/name'

export class AccountByIdCell extends React.Component {
  render() {
    let Account = async( AccountName, {account: model('account')});
    return (<Account accountId={this.props.data[this.props.accountId]}/>)
  }
}

export class ContactCell extends React.Component {
  render() {
    return (this.props.children) ?
      <Link to="view-contact"
            params={{ contactId: this.props.data ? this.props.data[this.props.idField || 'id'] : undefined }}
            style={_.assign({
              color: this.context.muiTheme.palette.textColor
            }, this.props.cellStyle)
      }>
        <ContactIcon style={_.assign({
            fill: Utils.ColorManipulator
              .fade(this.context.muiTheme.palette.textColor, .5),
            marginRight: '5px', position: 'absolute'
          }, this.props.iconStyle
        )} />
        <div style={_.assign({
            paddingLeft: '30px',
            lineHeight: '25px'
          }, this.props.labelStyle
        )}>
          {this.props.children}
        </div>
      </Link> : null;
  }
}

export class SendCell extends React.Component {
  render() {
    return (
      <div style={_.assign({textAlign: 'center'}, this.props.cellStyle)} >
        <Link to={(this.props.to) ? this.props.to :'/'}>
          <SendIcon style={_.assign({
              fill: Utils.ColorManipulator
                .fade(this.context.muiTheme.palette.textColor, 0.6),
              verticalAlign: 'middle'
            }, this.props.iconStyle
          )} />
        </Link>
      </div>
    );
  }
}

export class StringCell extends React.Component {
  render() {
    return (
      <div style={_.assign({}, this.props.cellStyle)}>
        {this.props.children}
      </div>
    );
  }
}

export class NumberCell extends React.Component {
  render() {
    return (
      <div style={_.assign({}, this.props.cellStyle)} >
        { numeral(this.props.children).format('0,0.0000') }
      </div>
    );
  }
}

export class DateCell extends React.Component {
  formatDate(c) {
    if(c) {
      var d = new Date(c);
      c = d.toLocaleDateString();
    }
    return c;
  }
  render() {
    return (
      <div style={_.assign({}, this.props.cellStyle)}>
        {this.formatDate(this.props.children)}
      </div>
    );
  }
}

export class CurrencyCell extends React.Component {
  render() {
    return (
      <div style={_.assign({}, this.props.cellStyle)}>
        {numeral(this.props.children).format('$0,0.00')}
      </div>
    );
  }
}

export class LinkCell extends React.Component {
  render() {
    return (
      <Link style={_.assign({}, this.props.cellStyle)}
            to={(this.props.to) ? this.props.to :'/'}>
        {this.props.children}
      </Link>
    );
  }
}

export class UriCell extends React.Component {
  render() {
    return (
      <a  style={_.assign({}, this.props.cellStyle)}
          href={(this.props.href) ? this.props.href : '#'}>
          {this.props.children}
      </a>
    );
  }
}

export class ButtonCell extends React.Component {
  render() {
    <div style={_.assign({textAlign: 'center'}, this.props.cellStyle)}>
      <RaisedButton label={this.props.children} />
    </div>;
  }
}

export class BooleanCell extends React.Component {
  style() {
    return {
        true: { color: Styles.Colors.green500 },
        false: { color: Styles.Colors.red500 }
    }
  }
  render() {
    let style = (this.props.cellClasses) ?
                  _.assign(
                    this.style()[this.props.cellClasses[this.props.children]],
                    this.props.cellStyle)
                :
                  this.props.cellStyle;
    return <div style={style}>{this.props.children}</div>;
  }
}

export class RangeCell extends React.Component {
  style() {
    return {
        0: { color: Styles.Colors.green500 },
        1: { color: Styles.Colors.yellow500 },
        2: { color: Styles.Colors.amber500 },
        3: { color: Styles.Colors.orange500 },
        4: { color: Styles.Colors.red500 }
    }
  }
  render() {
    return  <div style={_.assign(
              this.style()[this.props.cellClasses[this.props.children]],
              this.props.cellStyle
            )}>
              {this.props.children}
            </div>;
  }
}

let CellTypes = {
    string: StringCell,
    number: NumberCell,
    date: DateCell,
    currency: CurrencyCell,
    uri: UriCell,
    link: LinkCell,
    button: ButtonCell,
    boolean: BooleanCell,
    account: AccountCell,
    accountById: AccountByIdCell,
    contact: ContactCell,
    agent: AgentCell,
    agentById: AgentByIdCell,
    send: SendCell,
    range: RangeCell
};

export {CellTypes};

AccountCell.contextTypes = { muiTheme: React.PropTypes.object };
ContactCell.contextTypes = { muiTheme: React.PropTypes.object };
AgentCell.contextTypes = { muiTheme: React.PropTypes.object };
SendCell.contextTypes = { muiTheme: React.PropTypes.object };
