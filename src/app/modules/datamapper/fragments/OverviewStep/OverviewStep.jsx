/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import { Box } from 'grommet';

/* consts */
import { uploadInitialstate } from '__consts__/UploadMediatorConst';
import { columns } from 'modules/datamapper/fragments/OverviewStep/OverviewStep.const';

/* styles */
import { ModuleContainer } from 'modules/datamapper/fragments/OverviewStep/OverviewStep.styles';
import { SectionHeading } from 'components/sort/Headings';
import ZoomTable from 'components/ZoomTable/ZoomTable';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      fileColumn: PropTypes.string,
      summary: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.any, // cause it can be number or string
        }),
      ),
      dataTypes: PropTypes.arrayOf(PropTypes.string),
      blankCells: PropTypes.number,
    }),
  ),
};
const defaultProps = {
  data: uploadInitialstate.overviewData,
};

const OverviewStep = props => {
  return (
    <ModuleContainer>
      <SectionHeading>Overview</SectionHeading>
      <Box>
        <ZoomTable columns={columns} data={props.data} />
      </Box>
    </ModuleContainer>
  );
};

OverviewStep.propTypes = propTypes;
OverviewStep.defaultProps = defaultProps;

export default OverviewStep;
