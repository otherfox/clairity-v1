import {} from 'babel/polyfill'
import {} from './less/main'
import React, {addons} from 'react/addons'
import injectTapEventPlugin from 'react-tap-event-plugin'
import SettingsManager from './shared/settings'

import Router from './shared/router'

let worker = new Worker('worker.js');

window.Perf = addons.Perf;

injectTapEventPlugin();

Router.run((Handler, state) => React.render(<Handler />, document.body));
