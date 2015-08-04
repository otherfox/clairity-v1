import React from 'react'
import {
  TextField
} from 'material-ui'

class Filter extends React.Component {
  getFilterByType(type) {
    switch(type) {
      case 'muiTextField':
        let filter = <TextField label={this.props.label} />
    }
    return filter;
  }
  render() {
    return (
      <div>{this.getFilterByType(this.props.type)}</div>
    )
  }
}

export default Filter;
