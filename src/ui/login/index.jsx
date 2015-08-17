import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import Footer from  '../shared/components/footer'
import Header from '../shared/components/header'
import TopNav from '../shared/components/topnav'
import LeftNav from '../shared/components/leftnav'
import Content from '../shared/components/content'
import Settings from '../shared/components/settings'
import ThemeManager from '../shared/themes/themeManager'
import {
  RadioButtonGroup,
  RadioButton,
  Checkbox,
  FlatButton,
  RaisedButton,
  FloatingActionButton,
  IconButton,
  Toggle,
  Slider,
  DropDownMenu,
  DatePicker,
  TextField,
  Paper
} from 'material-ui'

import controllable from 'react-controllables'

import {tryLogin, loginSuccess} from '../../core/actions/login'
import {} from '../../core/queries/login'

@controllable(['username', 'password'])
class LoginForm extends React.Component {
  changeUsername(ev) {
    if (!this.props.onUsernameChange) return;
    this.props.onUsernameChange(ev.target.value);
  }
  changePassword(ev) {
    if (!this.props.onPasswordChange) return;
    this.props.onPasswordChange(ev.target.value);
  }
  fireLogin() {
    if (this.props.onLogin) {
      this.props.onLogin({username: this.props.username, password: this.props.password});
    }
  }
  render() {
    return (
      <Layout widths={{lg: ['400px']}} type={'center-v'} style={{ backgroundColor: this.props.backgroundColor , display: 'block', height: window.innerHeight+'px' }}>
        <div>
          <Paper>
            <div style={{position: 'relative', margin: '0 auto', padding: '3em 0 5em', display: 'table'}}>
              <Header><h1>Clairity</h1></Header>
              <div>
                <TextField
                  value={this.props.username}
                  onChange={e => this.changeUsername(e)}
                  floatingLabelText="Username" />
              </div>
              <div>
                <TextField
                  value={this.props.password}
                  floatingLabelText="Password"
                  onChange={e => this.changePassword(e)}
                  onEnterKeyDown={() => this.fireLogin()}
                  type="password" />
              </div>
              <div style={{marginTop: '1em'}}>
                <RaisedButton onClick={() => this.fireLogin()} secondary={true} label={'Login'} />
              </div>
            </div>
          </Paper>
        </div>
      </Layout>
    );
  }
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLogin: PropTypes.func
}

import {Navigation} from 'react-router'

const Login = React.createClass({
  contextTypes: { muiTheme: React.PropTypes.object},
  mixins: [Navigation],
  componentDidMount() {
    loginSuccess.listen(() => this.transitionTo('leads'));
  },
  tryLogin(username, password) {
    tryLogin(username, password);
  },
  render() {
    return (
      <LoginForm defaultUsername="ornemployee@yahoo.com" onLogin={this.tryLogin} backgroundColor={this.context.muiTheme.palette.canvasColor}/>
    );
  }
});

export default Login;
