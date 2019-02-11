/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.array
};
const defaultProps = {
  data: []
};

const ContextPreview = props => {
  return <ComponentBase />;
};

ContextPreview.propTypes = propTypes;
ContextPreview.defaultProps = defaultProps;

export default ContextPreview;