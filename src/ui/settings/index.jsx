
import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import Details from  '../shared/components/details'
import SettingsManager from '../shared/settings'

import {
  RadioButtonGroup,
  RadioButton,
  Checkbox,
  FlatButton,
  RaisedButton,
  FloatingActionButton,
  IconButton,
  Toggle,
  Slider,
  DropDownMenu,
  DatePicker,
  TextField,
  Paper
} from 'material-ui'

import controllable from 'react-controllables'

import {Navigation} from 'react-router'

@controllable(['theme', 'compact'])
class SettingsForm extends React.Component {
  render() {
    let compactToggle = (
      <Layout>
        <Toggle labelStyle={{minWidth: 100}}
                name="compactView"
                checked={this.props.compact}
                onToggle={(e, compact) => this.props.onCompactChange(compact)}
                label="Compact View" />
      </Layout>
    );
    console.log('theme value', this.props.theme)
    let themeDropdown = (
      <Layout>
        <DropDownMenu selectedIndex={this.props.theme == 'light' ? 0 : 1}
                      onChange={(e, i) => this.props.onThemeChange(i ? 'dark' : 'light') /* TODO: Use real dropdown */}
                      menuItems={[
                        { payload: 'light', text: 'Clairity Light' },
                        { payload: 'dark',  text: 'Clairity Dark'  }
                      ]} />
      </Layout>
    );
    return (
      <Details
        title={'Settings'}
        data={[
            { label: 'Compact Mode', value: compactToggle },
            { label: 'Site Theme',   value: themeDropdown },
        ]}
      />
    );
  }
}

SettingsForm.propTypes = {
  theme: PropTypes.string.isRequired,
  compact: PropTypes.bool.isRequired
};

let Settings = React.createClass({
  mixins: [Navigation],

  render() {
    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
      <Paper>
        <Layout widths={{}} cPadding={'0 20px 20px 20px'}>
          <SettingsForm defaultTheme={SettingsManager.data.theme}
                        defaultCompact={SettingsManager.compact}
                        onCompactChange={c => SettingsManager.compact = c}
                        onThemeChange={t => _.defer(() => SettingsManager.theme = t)} />
        </Layout>
      </Paper>
    </Layout>
    );
  }
});

export default Settings;
