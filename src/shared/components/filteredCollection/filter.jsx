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
import fuzzy from 'fuzzy'

let { ColorManipulator } = Utils;

export class CheckBoxFilter extends Component {
  style() {
    return {
      marginTop: '40px'
    }
  }
  filter(data){
    let checked = this.refs.internal.isChecked();
    let test = this.props.not ? !checked : checked;
    if (this.props.alwaysMatch) {
      return results.filter(row => row[this.props.name] == test);
    }
    let results = !checked ? data : data.filter(row => row[this.props.name] == test);
    console.log('checkbox filter', results.length, results);
    return results;
  }
  render() {
    return <Checkbox  defaultChecked={this.props.defaultValue}
                      onCheck={this.props.onChange}
                      style={_.assign(this.style(), this.props.style)}
                      label={this.props.label}
                      ref='internal'/>
  }
}

@contextTypes({
  muiTheme: React.PropTypes.object
})

export class RadioButtonFilter extends Component {
  style() {
    return {
      label: {
        color: ColorManipulator.fade(this.context.muiTheme.palette.textColor, .6),
        float: 'left',
        lineHeight: '180%',
        paddingRight: '20px'
      },
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
      }
    }
  }
  filter(data) {
    let field = this.refs.internal.getSelectedValue();
    let results = (field) ? data.filter(row => row[this.props.name] == field) : data;
    return results;
  }
  render() {
    return (
          <div style={_.assign(this.style().muiRadioButtons, this.props.style)}>
              <span style={_.assign(this.style().label, this.props.labelStyle )}>{this.props.label}</span>
              <RadioButtonGroup name={this.props.buttonGroup.name}
                                style={_.assign(this.style().muiRadioButtonGroup, this.props.buttonGroup.style)}
                                defaultSelected={this.props.value}
                                onChange={this.props.onChange}
                                ref="internal">
                {_.map( this.props.options, button =>
                  <RadioButton  value={button.value}
                                key={button.label + button.value}
                                label={button.label}
                                style={_.assign(this.style().muiRadioButton, button.style)}
                                defaultChecked= {button.defaultChecked}/>
                )}
              </RadioButtonGroup>
            </div>
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
