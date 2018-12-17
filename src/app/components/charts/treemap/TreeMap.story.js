import React from 'react';
import { storiesOf } from '@storybook/react';
import TreeMap from './TreeMap';
import { treeMapMockData } from '__mocks__/treeMapMock';

storiesOf('Charts', module).add('TreeMap', () => (
  <TreeMap data={treeMapMockData} />
));
