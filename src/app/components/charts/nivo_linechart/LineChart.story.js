import React from 'react';
import { storiesOf } from '@storybook/react';
import LineChart from './LineChart';
import { lineChartMockData } from '../../../__mocks__/lineChartMock';

storiesOf('Charts|Components/', module).add('LineChart', () => (
  <LineChart data={lineChartMockData} />
));
