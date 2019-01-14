/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FragmentContent,
  FragmentHeader,
  FragmentVisualisation,
} from 'components/theme/ThemeSheet';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import LineChart from 'components/charts/linechart/LineChart';
import { lineChartMockData } from '__mocks__/lineChartMock';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';

const ComponentBase = styled.div``;

const propTypes = {
  // data: PropTypes.object,
  background: PropTypes.string,
  aidsLineChartData: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.string,
          y: PropTypes.number,
        }),
      ),
      id: PropTypes.string,
    }),
  ),
};
const defaultProps = {
  // data: undefined,
  background: '',
  aidsLineChartData: [],
};

const AidsEpidemic = props => {
  return (
    <ModuleFragment
      background={props.background}
      title={countryDetailMockData.fragments[1].title}
      showInfoButton
    >
      <LineChart data={props.aidsLineChartData} />
    </ModuleFragment>
  );
};

AidsEpidemic.propTypes = propTypes;
AidsEpidemic.defaultProps = defaultProps;

export default AidsEpidemic;
