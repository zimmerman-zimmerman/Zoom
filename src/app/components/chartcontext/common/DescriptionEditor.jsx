/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import theme from 'theme/Theme';

const propTypes = {
  saveText: PropTypes.func,
  defaultVal: PropTypes.string,
  maxCharLength: PropTypes.number
};

const defaultProps = {
  maxCharLength: 200
};

const Comp = styled(props => <InputBase {...props} />)`
  && {
    width: 100%;
    margin-bottom: 20px;
    padding: 15px;
    font-size: 14px;
    font-family: ${theme.font.zoomFontFamOne};
    border-top: 2px solid black;

    textarea {
      &::placeholder {
        color: black;
        font-size: 14px;
        opacity: 1;
      }
    }
  }
`;

class DescriptionEditor extends React.Component {
  state = {
    text: this.props.defaultVal
  };

  handleChangeInput = e => {
    const description = e.target.value.slice(0, this.props.maxCharLength);
    this.setState({
      text: description
    });
    this.props.saveText(description);
  };

  render() {
    const { defaultVal, saveText, maxCharLength, ...otherProps } = this.props;

    return (
      <Comp
        multiline
        placeholder="[ Insert description here ]"
        rows={4}
        type="text"
        value={this.state.text}
        onChange={this.handleChangeInput}
        {...otherProps}
      />
    );
  }
}

DescriptionEditor.propTypes = propTypes;
DescriptionEditor.defaultProps = defaultProps;

export default DescriptionEditor;
