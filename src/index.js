import {} from 'babel/polyfill'
import {} from './less/main'
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Router from './shared/router'

injectTapEventPlugin();

Router.run((Handler, state) => React.render(<Handler />, document.body));
