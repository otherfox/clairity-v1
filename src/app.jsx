
import React from 'react'
import {RouteHandler} from 'react-router'
import {Styles} from 'material-ui'

import TopNav from './shared/components/topnav'
import LeftNav from './shared/components/leftnav'
import Content from './shared/components/content'
import Layout from './shared/components/layout'
import Footer from './shared/components/footer'

let ThemeManager = new Styles.ThemeManager()



export default class App extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return (
      <div>
        <TopNav />
        <div>
          <LeftNav />
          <Content>
            <RouteHandler />
          </Content>
        </div>
      <Footer />
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
}
