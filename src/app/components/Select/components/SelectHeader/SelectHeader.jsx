import React from 'react';
import PropTypes from 'prop-types';
import {
  ComponentBase,
  PointerContainer,
  LabelContainer,
} from 'components/Select/components/SelectHeader/SelectHeader.styles';

import IconPointer from 'assets/icons/IconPointer';

const propTypes = {
  headerStyle: PropTypes.object,
  arrowMargins: PropTypes.string,
};
const defaultProps = {
  headerStyle: {},
  arrowMargins: null,
};

const SelectHeader = props => (
  <ComponentBase
    data-name="selectHeader"
    style={props.headerStyle ? props.headerStyle : ''}
    onClick={props.onClick}
  >
    <input style={{ display: 'none' }} />
    <PointerContainer
      style={{ margin: props.arrowMargins ? props.arrowMargins : '' }}
    >
      <IconPointer />
    </PointerContainer>
    <LabelContainer>{props.label}</LabelContainer>
  </ComponentBase>
);

SelectHeader.propTypes = propTypes;
SelectHeader.defaultProps = defaultProps;

export default SelectHeader;
