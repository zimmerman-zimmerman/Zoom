/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SvgIconUser from 'assets/icons/IconUser';
import Theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */
const ComponentBase = styled.div`
  margin-bottom: 5px;
`;

const HeaderIcon = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderGreeting = styled.div`
  display: flex;
  justify-content: center;
  margin: 3px 0;
  font-size: 14px;
  font-weight: 300;
  color: ${Theme.color.aidsFondsRed};
  font-family: ${Theme.font.zoomFontFamTwo};
`;

const propTypes = {
  message: PropTypes.string,
  user: PropTypes.string,
  userPicture: PropTypes.node
};
const defaultProps = {
  message: 'Welcome back',
  user: 'user_a',
  userPicture: <SvgIconUser />
};
const UserGreeting = props => {
  return (
    <ComponentBase>
      <HeaderIcon>
        {/*Insert profile picture here*/}
        {props.userPicture}
      </HeaderIcon>
      <HeaderGreeting>
        {props.message} {props.user}
      </HeaderGreeting>
    </ComponentBase>
  );
};
UserGreeting.propTypes = propTypes;
UserGreeting.defaultProps = defaultProps;
export default UserGreeting;
