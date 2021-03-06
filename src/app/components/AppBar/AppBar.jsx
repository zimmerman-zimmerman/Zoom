/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet/components/Box';
import { Menu } from 'grommet-icons/icons/Menu';
import theme from 'theme/Theme';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
/* consts */
import paneTypes from '__consts__/PaneTypesConst';
/* utils */
import isEqual from 'lodash/isEqual';
/* components */
import {
  AidsFondLogo,
  ComponentBase,
  MenuButton,
  PaneButContainer,
  PaneButton,
  PaneButtonText,
  PaneButtonTextVar,
  PaneButtonVar
} from 'components/AppBar/AppBar.styles';
import Snackbar from 'components/Snackbar/Snackbar';
/* icons */
import SvgIconPlus from 'assets/icons/IconPlus';
import SvgIconCloseSmall from 'assets/icons/IconCloseSmaller';
import SvgIconBack from 'assets/icons/IconBack';
/* actions */
import * as actions from 'services/actions/general';
import * as nodeActions from 'services/actions/nodeBackend';

const propTypes = {
  toggleSideBar: PropTypes.func
};
const defaultProps = {
  // toggleSideBar: undefined,
};

export class AppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      anchorEl: null,
      paneButton: null,
      errorMessage: 'Error',
      openSnackbar: false
    };

    this.closeSave = this.closeSave.bind(this);
  }

  componentDidMount() {
    this.loadPaneButton();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname ||
      this.props.dataPaneOpen !== prevProps.dataPaneOpen ||
      !isEqual(this.props.user.data, prevProps.user.data)
    ) {
      this.loadPaneButton();
    }

    // so we only want to load the user to the dashboard after their
    // chart was saved
    // so that the edited chart would appear with the new data in the dashboard
    if (!isEqual(this.props.chartCreated, prevProps.chartCreated)) {
      if (this.props.chartCreated.data) {
        this.props.history.push('/dashboard');
      } else if (
        this.props.chartCreated.error &&
        this.props.chartCreated.error.result
      ) {
        this.setState({
          openSnackbar: true,
          errorMessage: JSON.stringify(this.props.chartCreated.error.result)
        });
      }
    }
  }

  // TODO somehow make this funciton reusable cause the same one is used in DuplicatorMediator.js
  closeSave() {
    if (this.props.user.data) {
      this.props.dispatch(actions.dataPaneToggleRequest(paneTypes.none));

      const chartData = {
        authId: this.props.user.data.authId,
        _public: this.props.chartData._public,
        teams: this.props.chartData.teams,
        chartId: this.props.chartData.chartId,
        name: this.props.chartData.name,
        description: this.props.chartData.desc,
        descIntro: this.props.chartData.descIntro,
        type: this.props.paneData.chartType,
        data: this.props.chartData.data,
        chartKeys: this.props.chartData.chartKeys,
        indKeys: this.props.chartData.indKeys,
        indicatorItems: this.props.chartData.selectedInd.map(indData => {
          return {
            indicator: indData.indicator,
            indLabel: indData.indLabel,
            subIndicators: indData.selectedSubInd,
            aggregate: indData.aggregate,
            // we also need to save the all sub indicators
            // for the datapanes default selections
            // because usually subindicators are refetched
            // when an indicator is selected
            // and because we want to initially load in just the
            // data from zoombackend, we don't want to be refetching
            // anything
            allSubIndicators: indData.subIndicators,
            dataSource: indData.dataSource
          };
        }),
        selectedSources: this.props.paneData.selectedSources,
        yearRange: this.props.paneData.yearRange,
        selectedYear: this.props.chartData.selectedYear,
        selectedYears: this.props.chartData.selectedYears,
        selectedCountryVal: this.props.chartData.selectedCountryVal,
        selectedRegionVal: this.props.chartData.selectedRegionVal,
        selectedRegionCodes: this.props.chartData.selectedRegionCodes,
        specOptions: this.props.chartData.specOptions
      };

      this.props.dispatch(nodeActions.createUpdateChartRequest(chartData));
    } else {
      this.setState({ openSnackbar: true, errorMessage: 'Unauthorized' });
    }
  }

  loadPaneButton() {
    let paneButton = '';
    let buttonLabel = '';
    let paneType = 'none';

    if (this.props.user.data) {
      if (this.props.dataPaneOpen === paneTypes.none) {
        if (
          this.props.location.pathname.indexOf('/home') !== -1 ||
          this.props.location.pathname.indexOf('/dashboard') !== -1
        ) {
          paneType = paneTypes.privPane;
          buttonLabel = 'Create';
        } else if (this.props.location.pathname.indexOf('/visualizer') !== -1) {
          paneType = paneTypes.visualizer;
          buttonLabel = 'Show Filters';
        }
      } else {
        paneType = paneTypes.none;
        buttonLabel =
          this.props.location.pathname.indexOf('/visualizer') !== -1
            ? 'Hide Filters'
            : 'Close';
      }
    } else {
      paneType =
        this.props.dataPaneOpen === paneTypes.none
          ? paneTypes.pubPane
          : paneTypes.none;
      buttonLabel = paneType !== paneTypes.none ? 'Geo map filters' : 'Hide';
    }

    let paneIcon =
      paneType !== paneTypes.none ? <SvgIconPlus /> : <SvgIconCloseSmall />;

    // so this be some extra confusing logic for navpane
    if (
      this.props.dataPaneOpen === paneTypes.createChart ||
      this.props.dataPaneOpen === paneTypes.convertData
    ) {
      paneType = paneTypes.privPane;
      buttonLabel = 'back';
      paneIcon = <SvgIconBack />;
    }

    switch (true) {
      case this.props.location.pathname === '/home' ||
        this.props.location.pathname.indexOf('/dashboard') !== -1 ||
        this.props.location.pathname === '/focus/NL' ||
        this.props.location.pathname === '/focus/nl' ||
        this.props.location.pathname === '/focus/KE' ||
        this.props.location.pathname === '/focus/ke' ||
        this.props.location.pathname === '/callback':
        paneButton = (
          <PaneButton
            data-cy="geomap-filter-button"
            onClick={() =>
              this.props.dispatch(actions.dataPaneToggleRequest(paneType))
            }
          >
            {paneIcon}
            <PaneButtonText data-cy="appbar-right-button">
              {buttonLabel}
            </PaneButtonText>
          </PaneButton>
        );
        break;
      case this.props.location.pathname.indexOf('/visualizer') !== -1:
        paneButton = (
          <PaneButContainer>
            <PaneButtonVar
              data-cy="geomap-close-save-button"
              onClick={() => this.closeSave()}
            >
              <PaneButtonTextVar data-cy="appbar-right-button">
                Close & Save
              </PaneButtonTextVar>
            </PaneButtonVar>
            <PaneButtonVar
              data-cy="geomap-filter-button"
              onClick={() =>
                this.props.dispatch(actions.dataPaneToggleRequest(paneType))
              }
            >
              <PaneButtonTextVar data-cy="appbar-right-button">
                {buttonLabel}
              </PaneButtonTextVar>
            </PaneButtonVar>
          </PaneButContainer>
        );
        break;
      default:
        break;
    }

    this.setState({ paneButton });
  }

  render() {
    return (
      <ComponentBase
        elevation="small"
        direction="row"
        justify="between"
        align="center"
      >
        <Box direction="row" justify="center">
          <Snackbar
            message={this.state.errorMessage}
            open={this.state.openSnackbar}
            onClose={() => this.setState({ openSnackbar: false })}
          />
          <MenuButton
            plain
            icon={<Menu color={theme.color.aidsFondsRed} />}
            onClick={this.props.toggleSideBar}
            data-cy="sidebar-toggle"
          />
          <Link to="/">
            <AidsFondLogo
              data-cy="home-logo"
              a11yTitle="Aidsfonds logo"
              fit="contain"
              alignSelf="center"
              src="https://zoom.aidsfonds.nl/static/b459aca02fec5b684d4a8fb3fe7b44a6.svg"
            />
          </Link>
        </Box>

        {this.state.paneButton}
      </ComponentBase>
    );
  }
}

AppBar.propTypes = propTypes;
AppBar.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    chartData: state.chartData.chartData,
    paneData: state.paneData.paneData,
    user: state.currentUser,
    chartCreated: state.chartCreated,
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(withRouter(AppBar));
