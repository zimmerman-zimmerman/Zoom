/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
/* utils */
import find from 'lodash/find';
/* consts */
import graphKeys from '__consts__/GraphStructKeyConst';
/* components */
import ChartLegends from 'modules/visualizer/sort/container/fragments/common/ChartLegends';
import { ResponsivePie } from '@nivo/pie';
import TooltipContent from 'modules/visualizer/sort/container/fragments/common/ToolTipContent';
/* styles */
import {
  FragmentBase,
  ChartContainer
} from 'modules/visualizer/sort/container/VizContainer.style';

/* styles */
//import { LineYearContainer } from 'modules/visualizer/sort/container/VizContainer.style';

const Box = styled.div`
  width: 1024px;
  height: 500px;
  outline: 1px solid gray;
`;

const propTypes = {
  indicatorData: PropTypes.arrayOf(PropTypes.shape({})),
  donutColors: PropTypes.arrayOf(PropTypes.string),
  chartKeys: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string
    })
  )
};
const defaultProps = {
  indicatorData: [],
  donutColors: [],
  chartKeys: []
};

const DonutchartFragment = props => {
  return (
    <FragmentBase>
      <ChartContainer>
        <Box>
          <ResponsivePie
            animate
            /* todo: currently indicator data is empty, needs to get data */
            data={props.indicatorData}
            margin={{
              top: 40,
              right: 80,
              bottom: 80,
              left: 80
            }}
            // aids related deaths (unaids) - adolescents (10 to 19) realistic estimate
            innerRadius={0.65}
            padAngle={0.7}
            cornerRadius={4}
            colors={props.donutColors}
            colorBy={d => {
              const chartItem = find(props.chartKeys, ['name', d.label]);
              if (chartItem) {
                return chartItem.color;
              }
              return '#38bcb2';
            }}
            borderWidth={1}
            borderColor="inherit:darker(0.2)"
            enableSlicesLabels={false}
            radialLabelsSkipAngle={5}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor="inherit"
            motionStiffness={90}
            motionDamping={15}
            radialLabel={item => {
              const radLab = item.geoName || item.label;

              if (radLab.length > 13) {
                return `${radLab.substr(0, 13)}...`;
              }
              return radLab;
            }}
            tooltip={payload => (
              <TooltipContent
                xKey={payload.geoName}
                index={payload.id}
                color={payload.color}
                valueLabel={payload.label}
                value={payload.value}
                format={payload.format}
              />
            )}
            // tooltipFormat={l => {
            //   console.log(l);
            //   return `EUR ${l.toLocaleString(
            //     {},
            //     {
            //       minimumFractionDigits: 0,
            //       maximumFractionDigits: 2
            //     }
            //   )}`;
            // }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
          />
        </Box>
        <ChartLegends data={props.chartKeys} />
      </ChartContainer>
    </FragmentBase>
  );
};

DonutchartFragment.propTypes = propTypes;
DonutchartFragment.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    donutColors: state.chartData.chartData.specOptions[graphKeys.colorPallet]
  };
};

export default connect(mapStateToProps)(DonutchartFragment);
