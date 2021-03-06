import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
/* consts */
import paneTypes from '__consts__/PaneTypesConst';
/* actions */
import * as actions from 'services/actions/general';
/* icons */
import SvgIconPointer from 'assets/icons/IconPointer';
import { convertDataItems, createChartItems } from './NavPane.const';
/* styles */
import {
  ComponentBase,
  ItemIcon,
  ItemLabel,
  NavPaneItem
} from './NavPane.style';
import get from 'lodash/get';

/* todo: re-assess logic in this component, seems somewhat convoluted */

class NavPane extends React.Component {
  state = {
    pane: this.props.dataPaneOpen
  };

  componentDidUpdate(prevProps) {
    if (this.props.dataPaneOpen !== prevProps.dataPaneOpen) {
      this.setState({ pane: this.props.dataPaneOpen });
    }
  }

  clickStartPaneItem = item => {
    this.props.dispatch(actions.dataPaneToggleRequest(item));
    // so basically we will have some different logic for the
    // 'explore data' section when the user is in their dashboard
    // when clicked it will redirect the user to the home page
    // with the 'explora data'/ indicator pane open
    if (
      this.props.location.pathname.indexOf('/dashboard') !== -1 &&
      item === paneTypes.pubPane
    ) {
      this.props.history.push('/home');
    }
  };

  renderPaneItems = () => {
    switch (this.state.pane) {
      case paneTypes.privPane:
        return (
          <React.Fragment>
            <NavPaneItem
              to="#"
              onClick={() => this.clickStartPaneItem(paneTypes.createChart)}
              data-cy="nav-pane-item-0"
            >
              <ItemIcon>
                <SvgIconPointer />
              </ItemIcon>
              <ItemLabel>Create chart</ItemLabel>
            </NavPaneItem>

            {/*{this.props.user.role != 'Regular user' && (*/}

            {get(this.props.user, 'role', '') === 'Administrator' ||
            get(this.props.user, 'role', '') === 'Super admin' ||
            get(this.props.user, 'role', '') === 'Data steward' ? (
              <NavPaneItem to="/mapper" data-cy="nav-pane-item-1">
                <ItemIcon>
                  <SvgIconPointer />
                </ItemIcon>
                <ItemLabel>Convert data</ItemLabel>
              </NavPaneItem>
            ) : null}
            {/*)}*/}

            <NavPaneItem
              to="#"
              onClick={() => this.clickStartPaneItem(paneTypes.pubPane)}
              data-cy="nav-pane-item-2"
            >
              <ItemIcon>
                <SvgIconPointer />
              </ItemIcon>
              <ItemLabel>Explore data</ItemLabel>
            </NavPaneItem>
          </React.Fragment>
        );

      case paneTypes.createChart:
        return createChartItems.map((item, index) => {
          const datacy = `nav-pane-item-${index}`;
          return (
            <NavPaneItem
              to={item.navTo}
              key={item.label}
              data-cy={datacy}
              style={item.style}
            >
              <ItemIcon>
                <SvgIconPointer style={item.style} />
              </ItemIcon>
              <ItemLabel>{item.label}</ItemLabel>
            </NavPaneItem>
          );
        });

      case paneTypes.convertData:
        return convertDataItems.map((item, index) => {
          const datacy = `nav-pane-item-${index}`;
          return (
            <NavPaneItem to={item.navTo} key={item.label} data-cy={datacy}>
              <ItemIcon>
                <SvgIconPointer />
              </ItemIcon>
              <ItemLabel>{item.label}</ItemLabel>
            </NavPaneItem>
          );
        });
    }
  };

  render() {
    return (
      <ComponentBase data-cy="nav-pane">{this.renderPaneItems()}</ComponentBase>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open,
    user: state.currentUser.data
  };
};

export default connect(mapStateToProps)(withRouter(NavPane));
