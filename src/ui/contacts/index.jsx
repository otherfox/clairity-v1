import React, { PropTypes, Component } from 'react'
import async, { model } from '../shared/components/async'
import { Cards, DetailsObject } from '../shared/components'
import { Paper } from 'material-ui'
import { contextTypes } from '../shared/decorators'

@contextTypes({ lang: PropTypes.object })
@async({ contact: model() })
class ViewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  style() {
    return {}
  }

  render() {
    return (
      <div>
        // TODO: Implement {this.context.lang('Contact')} 
        <h1>Contact: {this.props.contact.name}</h1>
        <DetailsObject target={this.props.contact} />
      </div>
    );
  }
}

export default class extends Component {
  render() {
    return <ViewContact {...this.props.params} />
  }
};
