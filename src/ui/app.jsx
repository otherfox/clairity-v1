
import React from 'react'
import { RouteHandler } from 'react-router'

import TopNav from './shared/components/topnav'
import LeftNav from './shared/components/leftnav'
import Content from './shared/components/content'
import Layout from './shared/components/layout'
import Footer from './shared/components/footer'
import Wrapper from './shared/components/wrapper'

import ThemeManager from './shared/themes/themeManager'
import SettingsManager from './shared/settings'

import lang from './shared/lang/en-us'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: JSON.stringify(SettingsManager.data)
    };
    SettingsManager.vent.on('settingsChanged', key => this.setState({key}));
  }
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
      lang: function(s) {
        let key = s.toLowerCase().replace(/\s/g, '_').replace(/[^a-zA-Z\d:]/, '')
        return lang[key] || throw new Error(`Key not found in translation: '${key}' for string '${s}'`)
      }
    };
  }
  render() {
    return <RouteHandler key={this.state.key} />;
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
  lang: React.PropTypes.object
};

export class NavigationLayout extends React.Component {

  render() {
    return (
      <div>
        <TopNav />
        <Wrapper>
          <LeftNav />
          <Content>
            <RouteHandler />
          </Content>
          <Footer />
        </Wrapper>
      </div>
    )
  }
}
