import React, { Component } from 'react'
import mui, {IconButton, Toggle, FloatingActionButton, FontIcon, Utils, Styles} from 'material-ui'
import Link from '../link'
import async, {model} from '../async'
import numeral from 'numeral'
import ContactIcon from 'material-ui/lib/svg-icons/action/assignment-ind'
import SendIcon from 'material-ui/lib/svg-icons/content/send'

/************* Agent / User *************/

import UserName from '../../../users/public/link'
export class AgentCell extends Component {
  render() {
    return <UserName {...this.props}>{this.props.children}</UserName>
  }
}

export class AgentByIdCell extends Component {
  render() {
    let User = async( UserName, {user: model('user')});
    return <User userId={this.props.children} {...this.props}/>
  }
}

/************* Account / Customer *************/

import AccountName from '../../../accounts/public/link'
export class AccountCell extends Component {
  render() {
    return <AccountName {...this.props}>{this.props.children}</AccountName>
  }
}

export class AccountByIdCell extends Component {
  render() {
    let Account = async( AccountName, {account: model('account')});
    return (<Account accountId={this.props.data[this.props.accountId]} {...this.props}/>)
  }
}

export class ContactCell extends Component {
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

import ContactName from '../../../contacts/public/link'

export class ContactByIdCell extends Component {
  render() {
    let Contact = async( ContactName, { contact: model('contact') });
    return (<Contact contactId={this.props.data[this.props.contactId]}/>)
  }
}

export class SendCell extends Component {
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

export class StringCell extends Component {
  render() {
    return (
      <div style={_.assign({}, this.props.cellStyle)}>
        {this.props.children}
      </div>
    );
  }
}

export class NumberCell extends Component {
  render() {
    return (
      <div style={_.assign({}, this.props.cellStyle)} >
        { numeral(this.props.children).format('0,0.0000') }
      </div>
    );
  }
}

export class DateCell extends Component {
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

export class CurrencyCell extends Component {
  render() {
    return (
      <div style={_.assign({}, this.props.cellStyle)}>
        {numeral(this.props.children).format('$0,0.00')}
      </div>
    );
  }
}

export class LinkCell extends Component {
  render() {
    return (
      <Link style={_.assign({}, this.props.cellStyle)}
            to={(this.props.to) ? this.props.to :'/'}>
        {this.props.children}
      </Link>
    );
  }
}

export class UriCell extends Component {
  render() {
    return (
      <a  style={_.assign({}, this.props.cellStyle)}
          href={(this.props.href) ? this.props.href : '#'}>
          {this.props.children}
      </a>
    );
  }
}

export class ButtonCell extends Component {
  render() {
    <div style={_.assign({textAlign: 'center'}, this.props.cellStyle)}>
      <RaisedButton label={this.props.children} />
    </div>;
  }
}

export class BooleanCell extends Component {
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

export class RangeCell extends Component {
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
    contactById: ContactByIdCell,
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
