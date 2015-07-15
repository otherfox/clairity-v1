
import React from 'react'
import {RouteHandler} from 'react-router'

import TopNav from './shared/components/topnav'
import LeftNav from './shared/components/leftnav'
import Content from './shared/components/content'
import Layout from './shared/components/layout'
import Footer from './shared/components/footer'
import Wrapper from './shared/components/wrapper'

import ThemeManager from './shared/themes/themeManager'

export class App extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
      lang: {}
    };
  }
  render() {
    return <RouteHandler />;
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