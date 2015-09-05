import React, { PropTypes, addons, Component } from 'react/addons'
import _ from 'lodash'
import {
  Utils,
  Paper,
  ClearFix
} from 'material-ui'
import Layout from '../layout'
import LangText from '../LangText'
import DetailsRow from './detailRow'
import DetailsObject from './detailsObject'
import { contextTypes, propTypes, defaultProps } from '../../decorators'
export { DetailsRow, DetailsObject };
let { ColorManipulator } = Utils;

@contextTypes({ muiTheme: PropTypes.object })
@defaultProps({ widths: {lg: [5,7], md: [4,8], sm: [12]}, cPadding: '0 20px 5px 0' })
@propTypes({
  data: React.PropTypes.array,
  title: React.PropTypes.string,
  labelTop: React.PropTypes.bool,
  headerStyle: React.PropTypes.object,
  rowStyle: React.PropTypes.object,
  labelStyle: React.PropTypes.object,
  valueStyle: React.PropTypes.object,
  breakpoints: React.PropTypes.object,
  cStyle: React.PropTypes.object,
  cStyles: React.PropTypes.object,
  cPadding: React.PropTypes.string,
  widths: React.PropTypes.object
})
class Details extends Component {
  style(detailType, context, props) {
    props = props || this.props;
    context = context || this.context.muiTheme;
    let textColor = context.palette.textColor;
    let labelColor = ColorManipulator.fade(context.palette.textColor, .6 );
    let headerColor = ColorManipulator.fade(context.palette.primary1Color, 1 );
    let labelLineHeight = {
      muiDropDown: '.6em',
      muiTextField: '.4em',
      muiDatePicker: '.4em',
      muiRadio: ''
    }

    return {
      cStyles: {
        lg: (props.labelTop) ? [{ textAlign: 'left' }] : [{ textAlign: 'right' }],
        sm: [{ textAlign: 'left'}]
      },
      header: {
        color: headerColor,
        margin: '1em 0',
        lineHeight: '1.8em',
        height: (props.title === null) ? '1.8em' : 'auto'
      },
      label: {
        color: labelColor,
        marginTop : (labelLineHeight[detailType]) ? labelLineHeight[detailType] : 'inherit'
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
    return this.props.data.map((dataObj,idx) =>
      dataObj ?
      <div style={ _.assign(this.style(dataObj.detailType).row, this.props.rowStyle) } key={idx}>
        <Layout widths={this.layout()}
                cPadding={this.props.cPadding}
                cStyles={ _.assign(this.style(dataObj.detailType).cStyles, this.props.cStyles)}
                cStyle={ _.assign(this.style(dataObj.detailType).cStyle, this.props.cStyle)}
                style={dataObj.rowStyle}>
          <div style={_.assign(this.style(dataObj.detailType).label, this.props.labelStyle, dataObj.labelStyle)}>{dataObj.label}</div>
          <div style={_.assign(this.style(dataObj.detailType).value, this.props.valueStyle, dataObj.valueStyle)}>{dataObj.value}</div>
        </Layout>
      </div>
      : false
    );
  }

  getContent() {
    let getStyle = this.style;
    let layout = this.layout();
    let count = 0;
    if (this.props.children == null) return null;
    return React.Children.map(this.props.children, child => {
      if (child == null) return null;
      return child.type == DetailsRow ?
        addons.cloneWithProps(child, {...this.props, ...child.props, getStyle, layout, key: count++})
      :
        addons.cloneWithProps(child, {key: count++});
    });
  }

  render() {
    let title = (this.props.title || this.props.title === null) ?
        (<div>
          <h3 style={_.assign(this.style().header, this.props.headerStyle)}>
            <LangText>{this.props.title}</LangText>
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
        <ClearFix>{content}</ClearFix>
      </div>
    );
  }
}


export default Details;
