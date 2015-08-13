import React from 'react'
import mui, { Utils, Styles, Card, CardHeader, CardActions, CardText, CardMedia, FlatButton, Avatar, CardTitle, Paper} from 'material-ui'
import Link from '../link'
import ContactIcon from 'material-ui/lib/svg-icons/action/assignment-ind'

export class DefaultCard extends React.Component {
  render() {
    let i = this.props.i;
    let data = this.props.data[i];
    return (this.props.children) ?
      // <Link to="view-contact" params={{contactId: 0}} style={{ color: this.context.muiTheme.palette.textColor }}>
      //   <ContactIcon style={{  fill: Utils.ColorManipulator.fade(this.context.muiTheme.palette.textColor, .5) }} />
      //   {this.props.children}
      // </Link>
      <Card transitionEnabled={false} {...this.props}>
        <CardHeader
          title={data[this.props.cardTitle]} />
        <CardText>
          {this.props.children}
        </CardText>
      </Card>
      : null;
  }
}

let CardTypes = {
    default: DefaultCard
};

export {CardTypes};

DefaultCard.contextTypes = { muiTheme: React.PropTypes.object };
