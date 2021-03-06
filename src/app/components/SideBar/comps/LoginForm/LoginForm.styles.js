import styled from 'styled-components';
import { Box } from 'grommet/components/Box';
import { TextInput } from 'grommet/components/TextInput';
import { Text } from 'grommet/components/Text';
import theme from 'theme/Theme';
import SimpleCheckbox from 'components/Checkbox/CheckBox';

import ZoomButton from 'components/ZoomButton/ZoomButton';

export const ComponentBase = styled.form`
  padding: 20px;
`;

export const LoginHeader = styled(Box)`
  display: flex;
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const LoginHeaderLabel = styled(Text)`
  padding-left: 10px;
`;

export const TextField = styled(TextInput)`
  font-size: 12px;
  margin: 10px 0;
  border-radius: 0;
  background: ${theme.color.zoomGreyZero};
  border-color: ${props => props.theme.borderColor};
  border-style: ${props => props.theme.borderStyle};
  -webkit-box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  -moz-box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  box-shadow: 0px 2px 4px 0px rgba(220, 220, 220, 0.5);
`;

export const FormButton = styled(ZoomButton)`
  margin: 10px 0;
`;

export const ForgotPassLink = styled(Text)`
  text-decoration: none;
  color: ${theme.color.aidsFondsRed};

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export const InfoText = styled(Text)`
  display: block;
  margin: 20px 0;
`;

export const Link = styled.a`
  text-decoration: none;
  color: ${theme.color.aidsFondsRed};
`;

export const ErrorMessage = styled(Box)`
  padding: 10px;
  background: ${theme.color.zoomGreyZero};
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.color.aidsFondsRed};
`;

export const ErrorText = styled(Text)`
  color: #000000;
  font-weight: bold;
`;

export const SignInContainer = styled.div`
  display: flex;
`;

export const PrivacyText = styled.div`
  font-size: ${theme.fontSize.smallText};
  font-family: ${theme.font.zoomFontFamTwo};
`;

export const PrivacyContainer = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  display: flex;
  width: 40%;
`;

export const CheckBoxContainer = styled.div`
  margin-bottom: auto;
  margin-top: 2px;
`;
