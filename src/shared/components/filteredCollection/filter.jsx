import React, {PropTypes, Component} from 'react'
import {
  TextField,
  RadioButtonGroup,
  RadioButton,
  RaisedButton,
  Checkbox,
  Utils
} from 'material-ui'
import _ from 'lodash'
import {contextTypes} from '../../decorators'
import controllable from 'react-controllables'
import fuzzy from 'fuzzy'

let { ColorManipulator } = Utils;

@controllable(['value'])
@contextTypes({
  muiTheme: React.PropTypes.object
})

class FilterView extends Component {
  style() {
    return {
      label: {
        color: ColorManipulator.fade(this.context.muiTheme.palette.textColor, .6),
        float: 'left',
        lineHeight: '180%',
        paddingRight: '20px'
      },
      muiTextField: {},
      muiRadioButtons: {
        marginTop: '40px'
      },
      muiRadioButtonGroup: {
        float: 'left',
        width: 'initial'
      },
      muiRadioButton: {
        float: 'left',
        width: 'initial',
        marginRight: '20px'
      },
      muiCheckBox: {
        marginTop: '40px'
      },
      muiRaisedButton: {},
    }
  }
  change(e) {
    this.props.value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;
    this.props.handleOnChange(this.props)
  }
  getFilterByType(type) {
    switch(type) {
      case 'muiTextField':
        return <TextField style={_.assign(this.style().muiTextField, this.props.style)}
                          floatingLabelText={this.props.label}
                          defaultValue={this.props.value}
                          onChange={e => this.change(e)} />
      case 'muiRadioButtons':
        return  <div style={_.assign(this.style().muiRadioButtons, this.props.style)}>
                  <span style={_.assign(this.style().label, this.props.labelStyle )}>{this.props.label}</span>
                  <RadioButtonGroup name={this.props.buttonGroup.name}
                                    style={_.assign(this.style().muiRadioButtonGroup, this.props.buttonGroup.style)}
                                    defaultSelected={this.props.value}
                                    onChange={e => this.change(e)}>
                    {_.map( this.props.options, button =>
                      <RadioButton  value={button.value}
                                    label={button.label}
                                    style={_.assign(this.style().muiRadioButton, button.style)}
                                    defaultChecked= {button.defaultChecked}/>
                    )}
                  </RadioButtonGroup>
                </div>
      case 'muiCheckBox':
        return <Checkbox  defaultChecked={this.props.value}
                          onCheck={e => this.change(e)}
                          style={_.assign(this.style().muiCheckBox, this.props.style)}
                          label={this.props.label}/>
    }
  }
  render() {
    return (
      <div>{this.getFilterByType(this.props.type)}</div>
    )
  }
}

export class TextFilter extends Component {
  style() {
    return {};
  }
  filter(data) {
    let field = this.refs.internal.getValue();
    let results = fuzzy.filter(field, data, {extract: row => row[this.props.name]});
    return results.map(r => r.original);
  }
  render() {
    return (
      <TextField style={_.assign(this.style(), this.props.style)}
                 floatingLabelText={this.props.label}
                 defaultValue={this.props.value}
                 onChange={this.props.onChange}
                 ref="internal" />
    );
  }
}

class Filter extends Component {
  handleOnChange(state) {
      this.props.onChange(state)
  }
  filter(data) {
    return data;
  }
  render() {
    return (
      <FilterView {..._.assign(this.props, {handleOnChange: state => this.handleOnChange(state), defaultValue: this.props.defaultValue})} />
    )
  }
}

Filter.defaultProps = { onChange: function() {} }

export default Filter;
