/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Route, BrowserRouter as Router } from 'react-router-dom';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';

/* components */
import GeoMap from 'components/GeoMap/GeoMap';
import { ControlPanelContainer } from 'modules/visualizer/VisualizerModule.style';
// import ExplorePanelMediator from 'mediators/ComponentMediators/ExplorePanelMediator/ExplorePanelMediator';
import VizSidebar from 'modules/visualizer/sort/sidebar/VizSidebar';
import VizContainer from 'modules/visualizer/sort/container/VizContainer';
import VisualizerModule from 'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator';
import ProgressIcon from 'components/ProgressIcon/ProgressIcon';

// import BaseDialog from 'components/Dialog/BaseDialog/BaseDialog';

const ModuleBase = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`;

const propTypes = {
  // indicators: PropTypes.arrayOf(PropTypes.shape),
  loggedIn: PropTypes.bool,
  sideBarOpen: PropTypes.bool,
  dropDownData: PropTypes.shape({}),
  indicators: PropTypes.arrayOf(PropTypes.shape({})),
  dataPaneOpen: PropTypes.string,
  moduleMode: PropTypes.string
};

const defaultProps = {
  indicators: [],
  dataPaneOpen: 'visualizer',
  dropDownData: {},
  loggedIn: true
};

class BuilderModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: true,
      sideBarOpen: false,
      indicators: []
    };

    this.onClose = this.onClose.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  onClose = () => {
    this.setState({ dialogOpen: false });
  };

  toggleSideBar = () => {
    this.setState({ sideBarOpen: true });
  };

  render() {
    return (
      <Router>
        <ModuleBase
          style={
            this.props.loading ? { pointerEvents: 'none', opacity: '0.4' } : {}
          }
        >
          {this.props.loading && <ProgressIcon />}
          <VizSidebar
            chartType={this.props.chartType}
            code={this.props.code}
            dropDownData={this.props.dropDownData}
            display={this.props.dataPaneOpen === paneTypes.visualizer}
          />
          <VizContainer
            outerHistory={this.props.outerHistory}
            indicators={this.props.indicators}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
          />
        </ModuleBase>
      </Router>
    );
  }
}
BuilderModule.propTypes = propTypes;
BuilderModule.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(BuilderModule);
