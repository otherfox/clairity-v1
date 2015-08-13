import {} from 'babel/polyfill'
import {} from './ui/less/main'
import React, {addons} from 'react/addons'
import injectTapEventPlugin from 'react-tap-event-plugin'
import SettingsManager from './ui/shared/settings'

import Router from './shared/router'
import WorkerBridge, {instance} from './core/bridge'

instance.dispatch({}).then(m => console.log('message received', m));

window.Perf = addons.Perf;

injectTapEventPlugin();

Router.run((Handler, state) => React.render(<Handler />, document.body));
