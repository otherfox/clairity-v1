import React, { PropTypes, Component }  from 'react'
import Settings from './settings'
import _ from 'lodash'
import { contextTypes } from '../decorators'
import lang from '../lang/en-us'

// TODO: @contextTypes({ lang: PropTypes.object })
export default class LangText extends Component {
  translate(s) {
    let key = s.toLowerCase().replace(/\s/g, '_').replace(/[^a-zA-Z_\d:]/, '')
    return lang[key] || key // s // TODO: throw new Error(`Key not found in translation: '${key}' for string '${s}'`)
  }

  render() {
    return (
      this.props.children
        ? <span>{this.translate(Children.only(this.props.children))}</span>
        : <span> </span>
    );
  }
}
