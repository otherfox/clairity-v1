import React, { Component, PropTypes} from 'react'
import mui, {
  Utils,
  Styles,
  Card,
  CardHeader,
  CardActions,
  CardText,
  CardMedia,
  RaisedButton,
  Avatar,
  CardTitle,
  Paper
} from 'material-ui'
import Link from '../link'
import ContactIcon from 'material-ui/lib/svg-icons/action/assignment-ind'
import AccountIcon from 'material-ui/lib/svg-icons/action/verified-user'
import { contextTypes } from '../../decorators'
import Details from '../details'
import async, { model } from '../async'

import UserName from '../../../users/public'
let AccountAgent = async(UserName, { user: model() });

@contextTypes({ muiTheme: PropTypes.object, lang: PropTypes.object })
export class DefaultCard extends Component {
  render() {
    let i = this.props.i;
    let data = this.props.data;
    let title = data[this.props.header];
    return (this.props.children) ?
      // <Link to="view-contact"
      //       params={{contactId: 0}}
      //       style={{ color: this.context.muiTheme.palette.textColor }}
      // >
      //   <ContactIcon style={{
      //     fill: Utils.ColorManipulator
      //       .fade(this.context.muiTheme.palette.textColor, .5)
      //     }}
      //   />
      //   {this.props.children}
      // </Link>
      <Card transitionEnabled={false} {...this.props}>
        <CardHeader
          title={data[title]}
          subtitle={data[this.props.subtitle]} />
        <CardText>
          { this.props.colNames
            .filter(r => r.name!==this.props.header)
            .map( r => (
                <div style={this.style().row}>
                  <div style={this.style().label}>{r.label}</div>
                  <div style={this.style().value}>
                    { (r.name === 'user_id') ?
                        (data.user_id) ?
                            <AccountAgent userId={data.user_id} />
                          :
                            <div style={{ height: '25px'}}>{this.context.lang('Unassigned')}</div>
                        :
                          data[r.name]
                    }
                  </div>
                </div>
              )
            )
          }
        </CardText>
      </Card>
      : null;
  }
}

@contextTypes({ muiTheme: PropTypes.object, lang: PropTypes.object })
export class AccountCard extends Component {
  style() {
    return {
      header: {
        backgroundColor: this.context.muiTheme.palette.accent1Color,
        height: '102px'
      },
      avatar: {
        fill: Styles.Colors.white,
        height: '2em'
      },
      title: {
        color: Styles.Colors.white,
        fontWeight: 'bold',
        fontSize: '1.1em',
        width: this.props.position.width - 72
      },
      subtitle: {
        color: Styles.Colors.darkWhite,
        width: this.props.position.width - 72,
        paddingTop: '10px'
      },
      row: {
        paddingBottom: '5px'
      },
      label: {
        color: Utils.ColorManipulator
            .fade(this.context.muiTheme.palette.textColor, .6),
        display: 'inline-block',
        width: '50%',
        textAlign: 'right',
        paddingRight: '10px'
      },
      value: {
        color: this.context.muiTheme.palette.textColor,
        display: 'inline-block',
        width: '50%'
      },
      action: {
        textAlign: 'center'
      }
    }
  }

  render() {
    let i = this.props.i;
    let data = this.props.data;
    let title = data[this.props.header];
    let { street1, street2, city, state, zip_code } = data;
    let subtitle1 = [street1, street2].filter(r=>!!r).join(', ');
    let subtitle2 = [city, state, zip_code].filter(r=>!!r).join(', ');
    let subtitle = (<div>{subtitle1}<br />{subtitle2}</div>);
    let avatar = (<AccountIcon style={this.style().avatar}/>);
    let params = { 'accountId': data[this.props.linkParam] };

    return (
      <Card transitionEnabled={false} {...this.props}>
        <CardHeader
          title={title}
          titleStyle={this.style().title}
          subtitle={subtitle}
          subtitleStyle={this.style().subtitle}
          avatar={avatar}
          style={this.style().header} />
        <CardText>
          { this.props.colNames
            .filter(r => r.name!==this.props.header)
            .map( r => (
                <div style={this.style().row}>
                  <div style={this.style().label}>{r.label}</div>
                  <div style={this.style().value}>
                    { (r.name === 'user_id') ?
                        (data.user_id) ?
                            <AccountAgent userId={data.user_id} />
                          :
                            <div style={{ height: '25px'}}>{this.context.lang('Unassigned')}</div>
                        :
                          data[r.name]
                    }
                  </div>
                </div>
              )
            )
          }
        </CardText>
        <CardActions>
          <div>
            <div style={this.style().action}>
              <Link to="view-account"
                    params={params} >
                <RaisedButton label="View Account"/>
              </Link>
            </div>
          </div>
        </CardActions>
      </Card>
    );
  }
}

@contextTypes({ muiTheme: PropTypes.object, lang: PropTypes.object })
export class LeadCard extends Component {
  style() {
    return {
      header: {
        backgroundColor: this.context.muiTheme.palette.accent1Color,
        height: '50px'
      },
      avatar: {
        fill: Styles.Colors.white,
        height: '2em'
      },
      title: {
        color: Styles.Colors.white,
        fontWeight: 'bold',
        fontSize: '1.1em',
        width: this.props.position.width - 72
      },
      subtitle: {
        color: Styles.Colors.darkWhite,
        width: this.props.position.width - 72,
        paddingTop: '10px'
      },
      row: {
        paddingBottom: '5px'
      },
      label: {
        color: Utils.ColorManipulator
            .fade(this.context.muiTheme.palette.textColor, .6),
        display: 'inline-block',
        width: '50%',
        textAlign: 'right',
        paddingRight: '10px'
      },
      value: {
        color: this.context.muiTheme.palette.textColor,
        display: 'inline-block',
        width: '50%'
      },
      action: {
        textAlign: 'center'
      }
    }
  }

  render() {
    let i = this.props.i;
    let data = this.props.data;
    let title = data[this.props.header];
    let { street1, street2, city, state, zip_code } = data;
    let subtitle1 = [street1, street2].filter(r=>!!r).join(', ');
    let subtitle2 = [city, state, zip_code].filter(r=>!!r).join(', ');
    let subtitle = (<div>{subtitle1}<br />{subtitle2}</div>);
    let avatar = (<AccountIcon style={this.style().avatar}/>);
    let params = { 'accountId': data[this.props.linkParam] };

    return (
      <Card transitionEnabled={false} {...this.props}>
        <CardHeader
          title={title}
          titleStyle={this.style().title}
          subtitle={subtitle}
          subtitleStyle={this.style().subtitle}
          avatar={avatar}
          style={this.style().header} />
        <CardText>
          { this.props.colNames
            .filter(r => r.name!==this.props.header)
            .map( r => (
                <div style={this.style().row}>
                  <div style={this.style().label}>{r.label}</div>
                  <div style={this.style().value}>
                    { (r.name === 'user_id') ?
                        (data.user_id) ?
                            <AccountAgent userId={data.user_id} />
                          :
                            <div style={{ height: '25px'}}>{this.context.lang('Unassigned')}</div>
                        :
                          data[r.name]
                    }
                  </div>
                </div>
              )
            )
          }
        </CardText>
        <CardActions>
          <div>
            <div style={this.style().action}>

            </div>
          </div>
        </CardActions>
      </Card>
    );
  }
}

let CardTypes = {
    default: DefaultCard,
    account: AccountCard,
    lead: LeadCard
};

export {CardTypes};

DefaultCard.contextTypes = { muiTheme: React.PropTypes.object };
