import React, { PropTypes, Component }  from 'react'
import Settings from './settings'
import _ from 'lodash'
import { contextTypes } from '../decorators'
//import lang from '../shared/lang/en-us'
import lang from '../lang/en-us'

export default class LangText extends Component {
  translate(s) {
    let key = s.toLowerCase().replace(/\s/g, '_').replace(/[^a-zA-Z_\d:]/, '')
    return lang[key] || key // s // TODO: throw new Error(`Key not found in translation: '${key}' for string '${s}'`)
  }

  render() {
    return (
      <span>{this.translate(this.props.children.toString())}</span>
    );
  }
}
