import React from 'react'
import mui, {RaisedButton, Toggle, FloatingActionButton, FontIcon} from 'material-ui'

export class UserCell extends React.Component {
  render() {
    return (
      <a href="#"
         style={{ color: '#333'}}>
        <span className="md md-account-box"
              style={{ fontSize: '1.4em', verticalAlign: 'text-bottom' }} />
        {this.props.children}
      </a>
    );
  }
}

export class SendCell extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}} >
        <RaisedButton>
          <FontIcon className="md-send button-icon" />
          <span className="button-label">{this.props.children}</span>
        </RaisedButton>
      </div>
    );
  }
}

export class ToggleCell extends React.Component {
  render() {
    if(this.props.children === "Active") {
      var status = <div className="c-green"><span className="md md-check"></span> Active</div>;
    } else {
      var status = <div className="c-a-1"><span className="md md-close"></span> Inactive</div>;
    }
    return status;
  }
}
