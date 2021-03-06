import React from 'react';
import { storiesOf } from '@storybook/react';
import PieChart from './PieChart';
import { pieChartMockData } from '../../../__mocks__/pieChartMock';

storiesOf('Charts|Components/', module).add('PieChart', () => (
  <PieChart data={pieChartMockData} />
));
