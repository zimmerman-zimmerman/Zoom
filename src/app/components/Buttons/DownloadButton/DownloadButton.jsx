import React from 'react';
import PropTypes from 'prop-types';

/* icons */
import IconDownload from 'assets/icons/toolpanel/IconDownload';

/* styles */
import { ComponentBase } from './DownloadButton.style';

/* components*/
import { Tooltip } from 'react-tippy';
import TableToolTip from 'components/ToolTips/TableToolTip/TableToolTip';

const propTypes = {
  handleDownload: PropTypes.func,
  toolTipText: PropTypes.string
};
const defaultProps = {
  handleDownload: () => console.log('Download'),
  toolTipText: 'Download'
};

const DownloadButton = props => (
  <Tooltip
    position="bottom"
    trigger="mouseenter"
    html={<TableToolTip margin="29px 0 0 0" text={props.toolTipText} />}
  >
    <ComponentBase onClick={props.handleDownload}>
      <IconDownload className="downloadButton" />
    </ComponentBase>
  </Tooltip>
);

DownloadButton.propTypes = propTypes;
DownloadButton.defaultProps = defaultProps;

export default DownloadButton;
