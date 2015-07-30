import React, {PropTypes} from 'react'
import Settings from './settings'
import _ from 'lodash'
import {
  Utils,
  Paper,
  ClearFix
} from 'material-ui'

import Layout from '../layout'

let { ColorManipulator } = Utils;

class Details extends React.Component {
  style(detailType) {

    let textColor = this.context.muiTheme.palette.textColor;
    let labelColor = ColorManipulator.fade(this.context.muiTheme.palette.textColor, .6 );
    let headerColor = ColorManipulator.fade(this.context.muiTheme.palette.primary1Color, 1 );
    let labelLineHeight = {
      muiDropDown: '4em',
      muiTextField: '3.2em',
      muiDatePicker: '3.2em'
    }

    return {
      cStyles: {
        lg: (this.props.labelTop === true) ? [{ textAlign: 'left' }] : [{ textAlign: 'right' }],
        sm: [{ textAlign: 'left'}]
      },
      header: {
        color: headerColor,
        margin: '1em 0',
        lineHeight: '1.8em',
        height: (this.props.title === null) ? '1.8em' : 'auto'
      },
      label: {
        color: labelColor,
        lineHeight: (labelLineHeight[detailType]) ? labelLineHeight[detailType] : 'inherit'
      },
      root: {
        color: textColor,
        lineHeight: '180%'
      },
      row: {
        margin: (detailType === 'muiCheckbox') ? '20px 0' : 'initial'
      },
      value: {
        marginTop: (detailType === 'muiButton') ? '20px' : 'initial'
      }
    };
  }

  layout() {
    return (this.props.labelTop === true) ? {} : this.props.widths;
  }

  getLegacyContent() {
    this.props.data.map((dataObj,idx) =>
      dataObj ?
      <div style={ _.assign(this.style(dataObj.detailType).row, this.props.rowStyle) } key={idx}>
        <Layout widths={this.layout()} cPadding={this.props.cPadding} cStyles={ _.assign(this.style(dataObj.detailType).cStyles, this.props.cStyles)} cStyle={ _.assign(this.style(dataObj.detailType).cStyle, this.props.cStyle)} style={dataObj.rowStyle}>
          <div style={_.assign(this.style(dataObj.detailType).label, this.props.labelStyle, dataObj.labelStyle)}>{dataObj.label}</div>
          <div style={_.assign(this.style(dataObj.detailType).value, this.props.valueStyle, dataObj.valueStyle)}>{dataObj.value}</div>
        </Layout>
      </div>
      : false
    );
  }

  getContent() {
    return false;
  }

  render() {
    let title = (this.props.title || this.props.title === null) ?
        (<div>
          <h3 style={_.assign(this.style().header, this.props.headerStyle)}>
            {this.props.title}
          </h3>
        </div>)
      :
        null;
    let content = (this.props.data && Array.isArray(this.props.data)) ?
        this.getLegacyContent()
      :
        this.getContent()
    return (
      <div style={this.style().root}>
        <ClearFix>{title}</ClearFix>
        <ClearFix>{fData}</ClearFix>
      </div>
    );
  }
}

Details.propTypes = {
  data: React.PropTypes.array,
  title: React.PropTypes.string,
  labelTop: React.PropTypes.bool,
  headerStyle: React.PropTypes.object,
  rowStyle: React.PropTypes.object,
  labelStyle: React.PropTypes.object,
  valueStyle: React.PropTypes.object,
  cStyle: React.PropTypes.object,
  cStyles: React.PropTypes.object,
  cPadding: React.PropTypes.string,
  widths: React.PropTypes.object
};

Details.defaultProps = {
  widths: {lg: [5,7], md: [4,8], sm: [12]},
  cPadding: '0 20px 5px 0'
};

Details.contextTypes = {
  muiTheme: React.PropTypes.object
};



export default Details;

export {default as DetailsRow} from './detailRow'
