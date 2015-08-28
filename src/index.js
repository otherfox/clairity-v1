import {} from 'babel/polyfill'
import {} from './ui/less/main'
import React, {addons} from 'react/addons'
import injectTapEventPlugin from 'react-tap-event-plugin'
import SettingsManager from './ui/shared/settings'

import AWS from 'aws-sdk'

import Router from './ui/shared/router'
import WorkerBridge, {instance} from './core/bridge' // force instantiation here

window.Perf = addons.Perf;

injectTapEventPlugin();

Router.run((Handler, state) => React.render(<Handler />, document.body));
