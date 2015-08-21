import React, { Component, PropTypes} from 'react'
import mui, { Utils, Styles, Card, CardHeader, CardActions, CardText, CardMedia, FlatButton, Avatar, CardTitle, Paper} from 'material-ui'
import Link from '../link'
import ContactIcon from 'material-ui/lib/svg-icons/action/assignment-ind'
import AccountIcon from 'material-ui/lib/svg-icons/action/verified-user'
import { contextTypes } from '../../decorators'

@contextTypes({ muiTheme: PropTypes.object })
export class DefaultCard extends Component {
  render() {
    let i = this.props.i;
    let data = this.props.data;
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
          title={data[this.props.header]}
          subtitle={data[this.props.subtitle]} />
        <CardText>
          {this.props.children}
        </CardText>
      </Card>
      : null;
  }
}

@contextTypes({ muiTheme: PropTypes.object })
export class AccountCard extends Component {
  style() {
    return {
      header: {
        backgroundColor: Utils.ColorManipulator
            .fade(this.context.muiTheme.palette.accent1Color, 1),
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
      }
    }
  }
  render() {
    let i = this.props.i,
        data = this.props.data,
        title = data[this.props.header],
        {street1, street2, city, state, zip_code} = data,
        subtitle1 = [street1, street2].filter(r=>!!r).join(', '),
        subtitle2 = [city, state, zip_code].filter(r=>!!r).join(', '),
        subtitle = (<div>{subtitle1}<br />{subtitle2}</div>),
        avatar = (<AccountIcon style={this.style().avatar}/>);

    return (this.props.children) ?
      <Card transitionEnabled={false} {...this.props}>
        <CardHeader
          title={title}
          titleStyle={this.style().title}
          subtitle={subtitle}
          subtitleStyle={this.style().subtitle}
          avatar={avatar}
          style={this.style().header} />
        <CardText>
          {this.props.children}
        </CardText>
      </Card>
      : null;
  }
}

let CardTypes = {
    default: DefaultCard,
    account: AccountCard
};

export {CardTypes};

DefaultCard.contextTypes = { muiTheme: React.PropTypes.object };
