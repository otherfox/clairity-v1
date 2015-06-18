import Fynx from 'fynx'
import {tryUserLogin} from './services'
import Store, {MessageTypes} from '../shared/store'

export const tryLogin = Fynx.createAsyncAction();

export const loginSuccess = Fynx.createAsyncAction();
export const loginFailure = Fynx.createAsyncAction();

// contact server
tryLogin.listen((username, password) => { // when someone tries to login
  tryUserLogin(username, password).then(  // send to server, then...
    user => loginSuccess(user), // if it succeeded, record the user
    reason => loginFailure(reason)  // if it failed, report the reason
  );
});

// success
loginSuccess.listen(user => {
  Store.handleMessage({
    type: MessageTypes.Write,
    payload: {
      table: 'user',
      row: user
    }
  });
  alert('You logged in!');
});

// failure
loginFailure.listen(reason => alert(`Unable to login: ${reason}`));
