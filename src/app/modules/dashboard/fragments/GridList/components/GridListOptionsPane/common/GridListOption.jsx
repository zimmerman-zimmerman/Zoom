/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

const ComponentBase = styled.div`
  display: ${console.log(props => props.display)};
  
  &:hover > * {
    cursor: pointer;
    color: ${theme.color.aidsFondsBlue};
  }

  &:hover path {
    fill: ${theme.color.aidsFondsBlue} !important;
  }
`;

const IconLabel = styled.label`
color: ${theme.color.aidsFondsRed};
font-family: ${theme.font.zoomFontFamOne};
font-size: 19px;
margin-left: 3px;
`;

const propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string,
    display: PropTypes.string
};
const defaultProps = {
    label: '',
    display: 'block'
};



const GridListOption = props => {
  function handleClick(){
    console.log('Click!')
  }

  return (
    <ComponentBase onClick={() => {
      handleClick();
    }}>
        {props.icon}
        <IconLabel>{props.label}</IconLabel>
      {console.log(props.display)}
    </ComponentBase>);
};
GridListOption.propTypes = propTypes;
GridListOption.defaultProps = defaultProps;
export default GridListOption;
