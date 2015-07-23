import React from 'react'
import mui, {IconButton, Toggle, FloatingActionButton, FontIcon, Utils, Styles} from 'material-ui'
import Link from '../link'
import numeral from 'numeral'
import UserIcon from 'material-ui/lib/svg-icons/action/account-circle'
import CustomerIcon from 'material-ui/lib/svg-icons/action/verified-user'
import SendIcon from 'material-ui/lib/svg-icons/content/send'

export class UserCell extends React.Component {
  render() {
    return (this.props.children) ?
      <Link to={'/'} style={{ color: this.context.muiTheme.palette.primary1Color }}>
        <UserIcon
              style={{ fill: this.context.muiTheme.palette.primary1Color, marginRight: '5px', position: 'absolute' }} />
        <div style={{ paddingLeft: '30px', lineHeight: '25px' }}>{this.props.children}</div>
      </Link> : null;
  }
}

export class CustomerCell extends React.Component {
  render() {
    return (this.props.children) ?
      <Link to={'/'} style={{ color: this.context.muiTheme.palette.primary1Color }}>
        <CustomerIcon
              style={{ fill: this.context.muiTheme.palette.primary1Color, marginRight: '5px', position: 'absolute' }} />
        <div style={{ paddingLeft: '30px', lineHeight: '25px' }}>{this.props.children}</div>
      </Link> : null;
  }
}

export class SendCell extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}} >
        <Link to={(this.props.to) ? this.props.to :'/'}>
          <SendIcon style={{ fill: Utils.ColorManipulator.fade(this.context.muiTheme.palette.textColor, 0.6), verticalAlign: 'middle'}} />
        </Link>
      </div>
    );
  }
}

export class StringCell extends React.Component {
  render() {
    return (<div>{this.props.children}</div>);
  }
}

export class NumberCell extends React.Component {
  render() {
    return (
      <div>
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
    return (<div>{this.formatDate(this.props.children)}</div>);
  }
}

export class CurrencyCell extends React.Component {
  render() {
    return (
      <div>
        {numeral(this.props.children).format('$0,0.00')}
      </div>
    );
  }
}

export class LinkCell extends React.Component {
  render() {
    return (
      <Link to={(this.props.to) ? this.props.to :'/'}>{this.props.children}</Link>
    );
  }
}

export class UriCell extends React.Component {
  render() {
    return (
      <a href={(this.props.href) ? this.props.href : '#'}>{this.props.children}</a>
    );
  }
}

export class ButtonCell extends React.Component {
  render() {
    <div style={{textAlign: 'center'}} ><RaisedButton label={this.props.children} /></div>;
  }
}

export class BooleanCell extends React.Component {
  style() {
    return {
        true: {
          color: Styles.Colors.green500
        },
        false: {
          color: Styles.Colors.red500
        }
    }
  }
  render() {
    return <div style={this.style()[this.props.cellStyle[this.props.children]]} >{this.props.children}</div>;
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
    user: UserCell,
    customer: CustomerCell,
    send: SendCell
};

export {CellTypes};

CustomerCell.contextTypes = { muiTheme: React.PropTypes.object };
UserCell.contextTypes = { muiTheme: React.PropTypes.object };
SendCell.contextTypes = { muiTheme: React.PropTypes.object };
