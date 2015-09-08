import React, { Children, Component, PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui'
import Layout from '../layout'

import { propTypes } from '../../decorators'

@propTypes({ compact: PropTypes.bool })
class CustomTabs extends Component {
  render() {
    let data = Children.map(this.props.children, child =>
      <Tab {...child.props}>{child}</Tab>
    );
    return (
      <div>
        {
          this.props.compact ?
              <Layout widths={{}} cPadding={'20px 20px 0 0'}>
                <Tabs>{data}</Tabs>
              </Layout>
            :
              this.props.children
        }
      </div>
    )
  }
}

export default CustomTabs;
