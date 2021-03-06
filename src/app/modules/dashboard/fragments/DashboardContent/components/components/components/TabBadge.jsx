/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const TabBadge = props => {
  return <ComponentBase />;
};

TabBadge.propTypes = propTypes;
TabBadge.defaultProps = defaultProps;

export default TabBadge;
