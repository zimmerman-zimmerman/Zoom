/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChartLegendItem from 'modules/visualizer/sort/container/fragments/common/ChartLegendItem';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  width: 1024px;
  height: max-content;
  padding-top: 20px;
  display: grid;
  grid-template-columns: 200px auto 200px;
`;

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string
    })
  )
};

const defaultProps = {
  data: []
};

const ChartLegends = props => {
  return (
    <ComponentBase>
      {props.data.map(indicator => {
        return (
          indicator.label && (
            <ChartLegendItem
              key={indicator.label}
              color={indicator.color}
              text={indicator.label}
              dataSource={indicator.dataSource}
              data-cy="legend"
              // data-cy={console.log(indicator.name)}
            />
          )
        );
      })}
    </ComponentBase>
  );
};

ChartLegends.propTypes = propTypes;
ChartLegends.defaultProps = defaultProps;

export default ChartLegends;
