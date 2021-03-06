import styled from 'styled-components';

import theme from 'theme/Theme';
import ZoomButton from 'components/ZoomButton/ZoomButton';

export const ComponentBase = styled.div`
  position: absolute;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0;
  background-color: ${theme.color.aidsFondsWhite};
  margin-left: -212px;
  margin-top: 30px;
  padding-bottom: 12px;
`;

export const FieldContainer = styled.div`
  display: flex;
  margin: 22px 22px;
`;

export const EmptyInput = styled.input`
  border: 0;
  outline: none;
  margin-top: 13px;
`;

export const InputContainer = styled.div`
  width: 150px;
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

export const InputLabelContainer = styled.div``;

export const InputLabel = styled.label`
  color: ${theme.color.zoomGreyFive};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
`;

export const FindReplaceButton = styled(ZoomButton)`
  height: 30px;
  font-size: 14px;
  font-family: ${theme.font.zoomFontFamOne};
  text-transform: capitalize;
  margin-top: auto;
  margin-left: 28px;
`;

export const ButtonLabel = styled.div`
  font-size: 14px;
  font-family: ${theme.font.zoomFontFamOne};
  text-transform: capitalize;
`;

export const ButtonContainer = styled.div`
  margin-top: auto;
  margin-left: 28px;
`;

export const buttonStyle = {
  width: 98
};
