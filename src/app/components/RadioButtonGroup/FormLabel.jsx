/* base */
import React from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';

export default styled(props => (
  <NoSsr>
    <FormControlLabel {...props} />
  </NoSsr>
))`
  && {
    margin: 0;
    margin-bottom: 10px;
    margin-right: 40px;
    span {
      font-family: ${theme.font.zoomFontFamTwo};
      line-height: 1;
      color: black;
      font-size: 14px;
    }
  }
`;
