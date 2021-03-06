/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import { connect } from 'react-redux';
/* consts */
import paneTypes from '__consts__/PaneTypesConst';
/* components */
import GridList from 'modules/dashboard/fragments/GridList/GridList';
import GridListOptionsPane from 'modules/dashboard/fragments/GridList/components/GridListOptionsPane/GridListOptionsPane';
import NavPane from 'components/Panes/NavPane/NavPane';
import DataPaneContainer from 'components/Panes/DataPaneContainer/DataPaneContainer';
import ProgressIcon from 'components/ProgressIcon/ProgressIcon';
import userRoles from '__consts__/UserRoleConst';

/* todo: logic in this component seems somewhat convoluted, needs some cleaning up */

const ComponentBase = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  justify-content: center;
  flex-direction: column;
  border-top: 2px solid #cfcfcf;
`;

const Message = styled.div`
  padding-top: 70px;
  text-align: center;
  font-size: 32px;
  line-height: 1;
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
`;

const Box = styled.div``;

const propTypes = {
  data: PropTypes.array,
  tabContentName: PropTypes.string,
  charts: PropTypes.array,
  users: PropTypes.array,
  trashCharts: PropTypes.array,
  removeAll: PropTypes.func,
  loading: PropTypes.bool,
  teams: PropTypes.array,
  isSuperAdmin: PropTypes.bool,
  isAdministrator: PropTypes.bool
};

const defaultProps = {
  charts: [],
  data: [],
  users: [],
  removeAll: null,
  trashCharts: [],
  teams: [],
  loading: false,
  tabContentName: 'Charts',
  isSuperAdmin: false,
  isAdministrator: false
};

const DashboardTabContent = props => {
  let targetData = [];
  let targetUrl = '';
  let leftOptionLabel = '';
  let sortIsVisible = true;
  let tabContentName = true;
  let isRemoveOption = false;
  const isAdmin =
    (props.user && props.user.role === userRoles.admin) ||
    props.user.role === userRoles.superAdm;

  switch (props.activeTab) {
    case 'charts':
      targetData = props.charts;
      leftOptionLabel = undefined;
      tabContentName = 'Charts';
      break;
    case 'data-sets':
      targetData = isAdmin || props.isModerator ? props.datasets : [];
      targetUrl = '/mapper';
      leftOptionLabel =
        props.isAdministrator || props.isSuperAdmin || props.isModerator
          ? 'map data set'
          : null;
      tabContentName = 'Data sets';
      break;
    case 'users':
      targetData = props.users;
      targetUrl = '/add-user';
      leftOptionLabel =
        props.isAdministrator || props.isSuperAdmin ? 'add user' : null;
      tabContentName = 'Users';
      break;
    case 'teams':
      targetData = isAdmin ? props.teams : [];
      targetUrl = '/create-team';
      leftOptionLabel = props.isSuperAdmin ? 'create team' : null;
      tabContentName = 'Teams';
      break;
    case 'trash':
      targetData = props.trashCharts;
      tabContentName = 'Trash';
      sortIsVisible = false;
      isRemoveOption = true;
  }

  return (
    <ComponentBase
      style={props.loading ? { pointerEvents: 'none', opacity: '0.4' } : {}}
    >
      {props.loading && <ProgressIcon />}

      {(props.dataPaneOpen === paneTypes.privPane ||
        props.dataPaneOpen === paneTypes.createChart ||
        props.dataPaneOpen === paneTypes.convertData) && (
        <DataPaneContainer>
          <NavPane auth0Client={props.auth0Client} />
        </DataPaneContainer>
      )}

      <Box>
        <GridListOptionsPane
          removeAll={props.removeAll}
          leftOptionLabel={leftOptionLabel}
          sortIsVisible={sortIsVisible}
          isRemoveOption={isRemoveOption}
          isSortByOpen={props.isSortByOpen}
          changeSortBy={props.changeSortBy}
          setWrapperRef={props.setWrapperRef}
          setIsSortByOpen={props.setIsSortByOpen}
          activeTab={props.activeTab}
          sort={props.sort}
          tabs={props.tabs}
          targetUrl={targetUrl}
        />
        {targetData.length > 0 && <GridList items={targetData} />}
      </Box>
      {targetData.length === 0 && (
        <Message>No item in {tabContentName}</Message>
      )}
    </ComponentBase>
  );
};

DashboardTabContent.propTypes = propTypes;
DashboardTabContent.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    user: state.currentUser.data,
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(DashboardTabContent);
