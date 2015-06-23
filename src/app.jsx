
import React from 'react'
import {RouteHandler} from 'react-router'

import TopNav from './shared/components/topnav'
import LeftNav from './shared/components/leftnav'
import Content from './shared/components/content'
import Layout from './shared/components/layout'
import Footer from './shared/components/footer'




export default class App extends React.Component {
  render() {
    return (
      <div>
        <TopNav />
        <Layout type="main">
          <LeftNav />
          <Content>
            <RouteHandler />
          </Content>
        </Layout>
      <Footer />
      </div>
    )
  }
}
