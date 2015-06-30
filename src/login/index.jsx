
import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import Footer from  '../shared/components/footer'
import TopNav from '../shared/components/topnav'
import LeftNav from '../shared/components/leftnav'
import Content from '../shared/components/content'
import Settings from '../shared/components/settings'
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

import {tryLogin, loginSuccess} from './actions'
import {} from './queries'

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
      <Layout widths={{lg: ['400px'], md: ['400px'], sm: ['400px'], xs: ['400px']}} type={'center-b'} style={{ backgroundColor: '#ffffff' }}>
        <div>
          <Paper>
            <div style={{position: 'relative', margin: '0 auto', padding: '3em 0 5em', display: 'table'}}>
              <h1>Clairity</h1>
              <div>
                <TextField
                  value={this.props.username}
                  onChange={this.changeUsername.bind(this)}
                  floatingLabelText="Username" />
              </div>
              <div>
                <TextField
                  value={this.props.password}
                  floatingLabelText="Password"
                  onChange={this.changePassword.bind(this)}
                  onEnterKeyDown={this.fireLogin.bind(this)}
                  type="password" />
              </div>
              <div style={{marginTop: '1em'}}>
                <RaisedButton onClick={this.fireLogin.bind(this)} secondary={true} label={'Login'} />
              </div>
            </div>
          </Paper>
        </div>
      </Layout>
    );
  }
}

LoginForm.defaultProps = { username: '', password: '' }
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLogin: PropTypes.func
}

let Form = controllable(LoginForm, ['username', 'password']);
import {Navigation} from 'react-router'

const Login = React.createClass({
  mixins: [Navigation],
  componentDidMount() {
    loginSuccess.listen(() => this.transitionTo('work-orders', {id: 1538}));
  },
  tryLogin(username, password) {
    tryLogin(username, password);
  },
  render() {
    return (
      <Form defaultUsername="ornemployee@yahoo.com" onLogin={this.tryLogin} />
    );
  }
});

export default Login;
